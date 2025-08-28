from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer
from sqlalchemy.orm import Session
import json
from typing import List, Dict, Optional
import asyncio
from datetime import datetime

from .models import User, Project, Task, Bug
from .auth import get_current_user, create_access_token, verify_password, get_password_hash
from .websocket_manager import ConnectionManager
from .database import get_db, create_tables
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from config import settings

app = FastAPI(title="DevTrack API", version="1.0.0")

# Create database tables on startup
@app.on_event("startup")
async def startup_event():
    create_tables()
    # Initialize sample data if database is empty
    db = next(get_db())
    try:
        # Check if we already have data
        user_count = db.query(User).count()
        if user_count == 0:
            print("Initializing sample data...")
            # Import and run the initialization
            sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
            from init_db import init_database
            init_database()
            print("Sample data initialized successfully!")
    except Exception as e:
        print(f"Error initializing sample data: {e}")
    finally:
        db.close()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# WebSocket connection manager
manager = ConnectionManager()

# Security
security = HTTPBearer()

@app.get("/")
async def root():
    return {"message": "DevTrack API is running!"}

# Authentication endpoints
@app.post("/auth/login")
async def login(credentials: dict, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == credentials["email"]).first()
    if not user or not verify_password(credentials["password"], user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    access_token = create_access_token(data={"sub": user.email, "role": user.role})
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "username": user.username,
            "role": user.role
        }
    }

@app.post("/auth/register")
async def register(user_data: dict, db: Session = Depends(get_db)):
    # Check if user exists
    if db.query(User).filter(User.email == user_data["email"]).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create new user
    hashed_password = get_password_hash(user_data["password"])
    user = User(
        email=user_data["email"],
        username=user_data["username"],
        hashed_password=hashed_password,
        role=user_data.get("role", "developer")
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    
    access_token = create_access_token(data={"sub": user.email, "role": user.role.value})
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "username": user.username,
            "role": user.role
        }
    }

# Project endpoints
@app.get("/projects")
async def get_projects(db: Session = Depends(get_db)):
    projects = db.query(Project).all()
    return projects

@app.post("/projects")
async def create_project(project_data: dict, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if current_user.role not in ["admin", "manager"]:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    project = Project(
        name=project_data["name"],
        description=project_data.get("description", ""),
        owner_id=current_user.id
    )
    db.add(project)
    db.commit()
    db.refresh(project)
    
    # Broadcast project creation
    await manager.broadcast(json.dumps({
        "type": "project_created",
        "data": {
            "id": project.id,
            "name": project.name,
            "description": project.description,
            "created_at": project.created_at.isoformat()
        }
    }))
    
    return project

# Task endpoints
@app.get("/tasks")
async def get_tasks(project_id: int = None, db: Session = Depends(get_db)):
    query = db.query(Task)
    if project_id:
        query = query.filter(Task.project_id == project_id)
    tasks = query.all()
    return tasks

@app.post("/tasks")
async def create_task(task_data: dict, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    task = Task(
        title=task_data["title"],
        description=task_data.get("description", ""),
        priority=task_data.get("priority", "medium"),
        status=task_data.get("status", "todo"),
        project_id=task_data["project_id"],
        assigned_to=task_data.get("assigned_to"),
        created_by=current_user.id
    )
    db.add(task)
    db.commit()
    db.refresh(task)
    
    # Broadcast task creation
    await manager.broadcast(json.dumps({
        "type": "task_created",
        "data": {
            "id": task.id,
            "title": task.title,
            "status": task.status,
            "priority": task.priority,
            "project_id": task.project_id,
            "created_at": task.created_at.isoformat()
        }
    }))
    
    return task

@app.put("/tasks/{task_id}")
async def update_task(task_id: int, task_data: dict, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    for key, value in task_data.items():
        setattr(task, key, value)
    
    task.updated_at = datetime.utcnow()
    db.commit()
    
    # Broadcast task update
    await manager.broadcast(json.dumps({
        "type": "task_updated",
        "data": {
            "id": task.id,
            "title": task.title,
            "status": task.status,
            "priority": task.priority,
            "updated_at": task.updated_at.isoformat()
        }
    }))
    
    return task

@app.put("/projects/{project_id}")
async def update_project(project_id: int, project_data: dict, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    # Check permissions - only admin, manager, or project owner can update
    if current_user.role not in ["admin", "manager"] and project.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    # Update project fields
    if "name" in project_data:
        project.name = project_data["name"]
    if "description" in project_data:
        project.description = project_data["description"]
    if "is_active" in project_data:
        project.is_active = project_data["is_active"]
    
    project.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(project)
    
    # Broadcast project update
    await manager.broadcast(json.dumps({
        "type": "project_updated",
        "data": {
            "id": project.id,
            "name": project.name,
            "description": project.description,
            "is_active": project.is_active,
            "updated_at": project.updated_at.isoformat()
        }
    }))
    
    return project

# Bug endpoints
@app.get("/bugs")
async def get_bugs(project_id: int = None, db: Session = Depends(get_db)):
    query = db.query(Bug)
    if project_id:
        query = query.filter(Bug.project_id == project_id)
    bugs = query.all()
    return bugs

@app.post("/bugs")
async def create_bug(bug_data: dict, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    bug = Bug(
        title=bug_data["title"],
        description=bug_data.get("description", ""),
        severity=bug_data.get("severity", "medium"),
        status=bug_data.get("status", "open"),
        project_id=bug_data["project_id"],
        assigned_to=bug_data.get("assigned_to"),
        reported_by=current_user.id
    )
    db.add(bug)
    db.commit()
    db.refresh(bug)
    
    # Broadcast bug creation
    await manager.broadcast(json.dumps({
        "type": "bug_created",
        "data": {
            "id": bug.id,
            "title": bug.title,
            "severity": bug.severity,
            "status": bug.status,
            "project_id": bug.project_id,
            "created_at": bug.created_at.isoformat()
        }
    }))
    
    return bug

@app.put("/bugs/{bug_id}")
async def update_bug(bug_id: int, bug_data: dict, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    bug = db.query(Bug).filter(Bug.id == bug_id).first()
    if not bug:
        raise HTTPException(status_code=404, detail="Bug not found")
    
    # Check permissions - admin, manager, assigned user, or reporter can update
    if (current_user.role not in ["admin", "manager"] and 
        bug.assigned_to != current_user.id and 
        bug.reported_by != current_user.id):
        raise HTTPException(status_code=403, detail="Not enough permissions")
    
    # Update bug fields
    if "title" in bug_data:
        bug.title = bug_data["title"]
    if "description" in bug_data:
        bug.description = bug_data["description"]
    if "severity" in bug_data:
        bug.severity = bug_data["severity"]
    if "status" in bug_data:
        bug.status = bug_data["status"]
    if "assigned_to" in bug_data:
        bug.assigned_to = bug_data["assigned_to"]
    
    bug.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(bug)
    
    # Broadcast bug update
    await manager.broadcast(json.dumps({
        "type": "bug_updated",
        "data": {
            "id": bug.id,
            "title": bug.title,
            "status": bug.status,
            "severity": bug.severity,
            "updated_at": bug.updated_at.isoformat()
        }
    }))
    
    return bug

# Analytics endpoints
@app.get("/analytics/dashboard")
async def get_dashboard_analytics(db: Session = Depends(get_db)):
    total_projects = db.query(Project).count()
    total_tasks = db.query(Task).count()
    total_bugs = db.query(Bug).count()
    open_bugs = db.query(Bug).filter(Bug.status == "open").count()
    completed_tasks = db.query(Task).filter(Task.status == "done").count()
    
    return {
        "total_projects": total_projects,
        "total_tasks": total_tasks,
        "total_bugs": total_bugs,
        "open_bugs": open_bugs,
        "completed_tasks": completed_tasks,
        "completion_rate": (completed_tasks / total_tasks * 100) if total_tasks > 0 else 0
    }

# WebSocket endpoint
@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: str):
    await manager.connect(websocket, client_id)
    try:
        while True:
            data = await websocket.receive_text()
            # Echo the message or process it
            await manager.send_personal_message(f"Message received: {data}", client_id)
    except WebSocketDisconnect:
        manager.disconnect(client_id)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
