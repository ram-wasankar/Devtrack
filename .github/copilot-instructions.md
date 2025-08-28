<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# DevTrack - Development & Bug Management Platform

This is a full-stack application built with:

## Backend (Python FastAPI)
- FastAPI framework with WebSocket support
- SQLAlchemy ORM with PostgreSQL
- JWT authentication with role-based access control
- Real-time updates via WebSockets
- Role-based access: admin, manager, developer, tester

## Frontend (React TypeScript)
- React 18 with TypeScript
- Material-UI (MUI) for components
- React Router for navigation
- Axios for API calls
- Real-time WebSocket integration
- Recharts for analytics visualization

## Key Features
- User authentication and authorization
- Project management
- Task tracking with status updates
- Bug reporting and tracking
- Real-time updates across all clients
- Analytics dashboard with charts
- Role-based permissions

## Code Style Guidelines
- Use TypeScript with proper typing
- Follow React functional components with hooks
- Use Material-UI components consistently
- Handle loading states and error messages
- Implement proper form validation
- Use async/await for API calls
- Follow RESTful API conventions

## Database Models
- User (id, email, username, role, hashed_password)
- Project (id, name, description, owner_id)
- Task (id, title, description, status, priority, project_id, assigned_to, created_by)
- Bug (id, title, description, severity, status, project_id, assigned_to, reported_by)

## WebSocket Events
- task_created, task_updated
- bug_created
- project_created
- Real-time notifications for all connected users
