#!/usr/bin/env python3
"""
Database initialization script for DevTrack
Creates the database tables and optionally adds sample data
"""

import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.database import create_tables, SessionLocal, Base, engine
from app.models import User, Project, Task, Bug
from app.auth import get_password_hash

def init_database():
    """Initialize the database with tables"""
    print("Creating database tables...")
    create_tables()
    print("Database tables created successfully!")

def add_sample_data():
    """Add sample data to the database"""
    db = SessionLocal()
    
    try:
        # Check if data already exists
        if db.query(User).first():
            print("Sample data already exists, skipping...")
            return
        
        print("Adding sample data...")
        
        # Create sample users
        admin_user = User(
            email="admin@devtrack.com",
            username="admin",
            hashed_password=get_password_hash("admin123"),
            role="admin"
        )
        
        manager_user = User(
            email="manager@devtrack.com", 
            username="manager",
            hashed_password=get_password_hash("manager123"),
            role="manager"
        )
        
        dev_user = User(
            email="developer@devtrack.com",
            username="developer", 
            hashed_password=get_password_hash("dev123"),
            role="developer"
        )
        
        tester_user = User(
            email="tester@devtrack.com",
            username="tester",
            hashed_password=get_password_hash("test123"), 
            role="tester"
        )
        
        db.add_all([admin_user, manager_user, dev_user, tester_user])
        db.commit()
        
        # Create sample project
        sample_project = Project(
            name="DevTrack Platform",
            description="A development and bug tracking platform",
            owner_id=admin_user.id
        )
        
        db.add(sample_project)
        db.commit()
        
        # Create sample tasks
        task1 = Task(
            title="Implement User Authentication",
            description="Create JWT-based authentication system",
            status="done",
            priority="high",
            project_id=sample_project.id,
            assigned_to=dev_user.id,
            created_by=manager_user.id
        )
        
        task2 = Task(
            title="Design Dashboard UI",
            description="Create responsive dashboard with analytics",
            status="in_progress", 
            priority="medium",
            project_id=sample_project.id,
            assigned_to=dev_user.id,
            created_by=manager_user.id
        )
        
        task3 = Task(
            title="Setup WebSocket Communication",
            description="Implement real-time updates via WebSockets",
            status="todo",
            priority="high",
            project_id=sample_project.id,
            assigned_to=dev_user.id,
            created_by=admin_user.id
        )
        
        db.add_all([task1, task2, task3])
        db.commit()
        
        # Create sample bugs
        bug1 = Bug(
            title="Login form validation error",
            description="Password field doesn't validate minimum length",
            severity="medium",
            status="open",
            project_id=sample_project.id,
            assigned_to=dev_user.id,
            reported_by=tester_user.id
        )
        
        bug2 = Bug(
            title="Dashboard charts not responsive",
            description="Analytics charts break on mobile devices",
            severity="low",
            status="fixed",
            project_id=sample_project.id,
            assigned_to=dev_user.id,
            reported_by=tester_user.id
        )
        
        db.add_all([bug1, bug2])
        db.commit()
        
        print("Sample data added successfully!")
        print("\nSample user accounts:")
        print("Admin: admin@devtrack.com / admin123")
        print("Manager: manager@devtrack.com / manager123") 
        print("Developer: developer@devtrack.com / dev123")
        print("Tester: tester@devtrack.com / test123")
        
    except Exception as e:
        print(f"Error adding sample data: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    init_database()
    
    # Ask if user wants to add sample data
    response = input("\nAdd sample data? (y/n): ").lower().strip()
    if response in ['y', 'yes']:
        add_sample_data()
    
    print("\nDatabase initialization complete!")
    print("You can now start the FastAPI server with: python -m app.main")
