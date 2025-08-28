#!/usr/bin/env python3
"""
DevTrack Database Administration Tool
Run this script to manage data directly in the database
"""

import sqlite3
from datetime import datetime
from app.models import UserRole

def connect_db():
    """Connect to the SQLite database"""
    return sqlite3.connect('devtrack.db')

def show_all_users():
    """Display all users"""
    conn = connect_db()
    cursor = conn.cursor()
    
    print("\n" + "="*60)
    print("📋 ALL USERS")
    print("="*60)
    
    cursor.execute("SELECT id, email, username, role, is_active, created_at FROM users")
    users = cursor.fetchall()
    
    if not users:
        print("No users found.")
    else:
        print(f"{'ID':<5} {'Email':<25} {'Username':<15} {'Role':<10} {'Active':<8} {'Created':<20}")
        print("-" * 90)
        for user in users:
            print(f"{user[0]:<5} {user[1]:<25} {user[2]:<15} {user[3]:<10} {user[4]:<8} {user[5]:<20}")
    
    conn.close()

def show_all_projects():
    """Display all projects"""
    conn = connect_db()
    cursor = conn.cursor()
    
    print("\n" + "="*60)
    print("📁 ALL PROJECTS")
    print("="*60)
    
    cursor.execute("""
        SELECT p.id, p.name, p.description, u.username as owner, p.created_at 
        FROM projects p 
        LEFT JOIN users u ON p.owner_id = u.id
    """)
    projects = cursor.fetchall()
    
    if not projects:
        print("No projects found.")
    else:
        print(f"{'ID':<5} {'Name':<20} {'Description':<30} {'Owner':<15} {'Created':<20}")
        print("-" * 95)
        for project in projects:
            desc = (project[2][:27] + "...") if project[2] and len(project[2]) > 30 else (project[2] or "")
            print(f"{project[0]:<5} {project[1]:<20} {desc:<30} {project[3] or 'N/A':<15} {project[4]:<20}")
    
    conn.close()

def show_all_tasks():
    """Display all tasks"""
    conn = connect_db()
    cursor = conn.cursor()
    
    print("\n" + "="*60)
    print("📋 ALL TASKS")
    print("="*60)
    
    cursor.execute("""
        SELECT t.id, t.title, t.status, t.priority, p.name as project, 
               u1.username as assigned, u2.username as creator, t.created_at
        FROM tasks t 
        LEFT JOIN projects p ON t.project_id = p.id
        LEFT JOIN users u1 ON t.assigned_to = u1.id
        LEFT JOIN users u2 ON t.created_by = u2.id
    """)
    tasks = cursor.fetchall()
    
    if not tasks:
        print("No tasks found.")
    else:
        print(f"{'ID':<5} {'Title':<20} {'Status':<12} {'Priority':<10} {'Project':<15} {'Assigned':<12} {'Creator':<12}")
        print("-" * 100)
        for task in tasks:
            title = (task[1][:17] + "...") if task[1] and len(task[1]) > 20 else (task[1] or "")
            print(f"{task[0]:<5} {title:<20} {task[2]:<12} {task[3]:<10} {task[4] or 'N/A':<15} {task[5] or 'N/A':<12} {task[6] or 'N/A':<12}")
    
    conn.close()

def show_all_bugs():
    """Display all bugs"""
    conn = connect_db()
    cursor = conn.cursor()
    
    print("\n" + "="*60)
    print("🐛 ALL BUGS")
    print("="*60)
    
    cursor.execute("""
        SELECT b.id, b.title, b.status, b.severity, p.name as project, 
               u1.username as assigned, u2.username as reporter, b.created_at
        FROM bugs b 
        LEFT JOIN projects p ON b.project_id = p.id
        LEFT JOIN users u1 ON b.assigned_to = u1.id
        LEFT JOIN users u2 ON b.reported_by = u2.id
    """)
    bugs = cursor.fetchall()
    
    if not bugs:
        print("No bugs found.")
    else:
        print(f"{'ID':<5} {'Title':<20} {'Status':<12} {'Severity':<10} {'Project':<15} {'Assigned':<12} {'Reporter':<12}")
        print("-" * 100)
        for bug in bugs:
            title = (bug[1][:17] + "...") if bug[1] and len(bug[1]) > 20 else (bug[1] or "")
            print(f"{bug[0]:<5} {title:<20} {bug[2]:<12} {bug[3]:<10} {bug[4] or 'N/A':<15} {bug[5] or 'N/A':<12} {bug[6] or 'N/A':<12}")
    
    conn.close()

def create_sample_data():
    """Create sample data for testing"""
    conn = connect_db()
    cursor = conn.cursor()
    
    print("\n🚀 Creating sample data...")
    
    try:
        # Sample projects
        cursor.execute("""
            INSERT OR IGNORE INTO projects (name, description, owner_id, created_at) 
            VALUES 
            ('E-Commerce Platform', 'Online shopping platform with payment integration', 1, ?),
            ('Mobile App', 'Cross-platform mobile application for task management', 1, ?),
            ('Data Analytics Tool', 'Business intelligence dashboard with real-time analytics', 1, ?)
        """, (datetime.now(), datetime.now(), datetime.now()))
        
        # Sample tasks
        cursor.execute("""
            INSERT OR IGNORE INTO tasks (title, description, status, priority, project_id, assigned_to, created_by, created_at) 
            VALUES 
            ('Setup Authentication', 'Implement JWT authentication system', 'in_progress', 'high', 1, 1, 1, ?),
            ('Design Product Catalog', 'Create responsive product listing page', 'todo', 'medium', 1, 1, 1, ?),
            ('Payment Gateway Integration', 'Integrate Stripe payment processing', 'todo', 'high', 1, 1, 1, ?),
            ('Mobile UI Design', 'Design mobile-first user interface', 'done', 'medium', 2, 1, 1, ?),
            ('API Documentation', 'Document all REST API endpoints', 'todo', 'low', 2, 1, 1, ?)
        """, (datetime.now(), datetime.now(), datetime.now(), datetime.now(), datetime.now()))
        
        # Sample bugs
        cursor.execute("""
            INSERT OR IGNORE INTO bugs (title, description, severity, status, project_id, assigned_to, reported_by, created_at) 
            VALUES 
            ('Login Form Validation', 'Email validation not working properly on login form', 'medium', 'open', 1, 1, 1, ?),
            ('Mobile Menu Issue', 'Hamburger menu not closing on mobile devices', 'high', 'in_progress', 2, 1, 1, ?),
            ('Chart Loading Error', 'Analytics charts fail to load with large datasets', 'critical', 'open', 3, 1, 1, ?)
        """, (datetime.now(), datetime.now(), datetime.now()))
        
        conn.commit()
        print("✅ Sample data created successfully!")
        
    except sqlite3.IntegrityError as e:
        print(f"⚠️  Note: Some data may already exist - {e}")
    except Exception as e:
        print(f"❌ Error creating sample data: {e}")
    finally:
        conn.close()

def main():
    """Main menu for database administration"""
    while True:
        print("\n" + "="*60)
        print("🔧 DEVTRACK DATABASE ADMINISTRATION")
        print("="*60)
        print("1. Show all users")
        print("2. Show all projects") 
        print("3. Show all tasks")
        print("4. Show all bugs")
        print("5. Create sample data")
        print("6. Exit")
        print("-" * 60)
        
        choice = input("Enter your choice (1-6): ").strip()
        
        if choice == '1':
            show_all_users()
        elif choice == '2':
            show_all_projects()
        elif choice == '3':
            show_all_tasks()
        elif choice == '4':
            show_all_bugs()
        elif choice == '5':
            create_sample_data()
        elif choice == '6':
            print("👋 Goodbye!")
            break
        else:
            print("❌ Invalid choice. Please try again.")

if __name__ == "__main__":
    main()
