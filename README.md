# DevTrack - Scalable Development & Bug Management Platform

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.68+-green.svg)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9+-blue.svg)](https://www.typescriptlang.org/)
[![Material-UI](https://img.shields.io/badge/Material--UI-5+-blue.svg)](https://mui.com/)

A modern, scalable development and bug management platform built with **Python FastAPI** backend and **React TypeScript** frontend. Features real-time updates via WebSockets, role-based access control, and an elegant GitHub-inspired UI design supporting 50+ concurrent users.

## 🚀 Features

- **🔐 Secure Authentication** - JWT-based auth with role-based access control
- **📊 Project Management** - Complete CRUD operations for project tracking
- **✅ Task Management** - Status tracking with priority levels and assignments
- **🐛 Bug Tracking** - Comprehensive bug reporting with severity levels
- **📈 Analytics Dashboard** - Interactive charts and real-time metrics
- **⚡ Real-time Updates** - WebSocket integration for instant synchronization
- **🎨 Premium UI** - GitHub-inspired design with smooth animations
- **👥 Multi-user Support** - Role-based access (Admin, Manager, Developer, Tester)

## 🛠️ Technology Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - SQL toolkit and ORM
- **SQLite** - Lightweight database
- **JWT** - Secure authentication tokens
- **WebSockets** - Real-time communication
- **Uvicorn** - ASGI server

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe JavaScript
- **Material-UI** - Google's Material Design
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Recharts** - Interactive charts

## 📦 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup
```bash
# Clone the repository
git clone <repository-url>
cd devtrack/backend

# Install dependencies
pip install -r requirements.txt

# Start the backend server
python -m app.main
```
Backend runs on: `http://localhost:8000`

### Frontend Setup
```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Start the development server
npm start
```
Frontend runs on: `http://localhost:3000`

## 🎯 Demo Accounts

Ready-to-use demo accounts for testing:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@devtrack.com | admin123 |
| Manager | manager@devtrack.com | manager123 |
| Developer | developer@devtrack.com | dev123 |
| Tester | tester@devtrack.com | test123 |

## 🏗️ Project Structure

```
DevTrack/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI application
│   │   ├── models.py            # Database models
│   │   ├── auth.py              # Authentication
│   │   ├── database.py          # Database config
│   │   └── websocket_manager.py # WebSocket handling
│   ├── config.py                # App configuration
│   ├── init_db.py               # Database initialization
│   └── requirements.txt         # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── contexts/            # React contexts
│   │   ├── theme/               # Material-UI theme
│   │   └── App.tsx              # Main application
│   ├── package.json             # Node dependencies
│   └── tsconfig.json            # TypeScript config
└── README.md
```

## 📊 API Documentation

### Authentication Endpoints
- `POST /auth/login` - User login
- `POST /auth/register` - User registration

### Core Endpoints
- `GET /projects` - List all projects
- `GET /tasks` - List all tasks
- `GET /bugs` - List all bugs
- `GET /analytics/dashboard` - Dashboard metrics

### Real-time
- `WS /ws/{client_id}` - WebSocket connection

**Full API documentation available at:** `http://localhost:8000/docs`

## 🎨 UI Features

- **GitHub-inspired Color Scheme** - Professional dark sidebar/topbar with light content
- **Premium Typography** - SF Pro Display and Inter fonts for enhanced readability
- **Smooth Animations** - Elastic hover effects and micro-interactions
- **Responsive Design** - Mobile-friendly Material-UI components
- **Interactive Charts** - Real-time analytics with Recharts

## 🔧 Development

### Backend Dependencies
```
fastapi>=0.68.0
uvicorn[standard]>=0.15.0
sqlalchemy>=1.4.0
python-jose[cryptography]>=3.3.0
passlib[bcrypt]>=1.7.4
python-multipart>=0.0.5
python-dotenv>=0.19.0
```

### Frontend Dependencies
```
react>=18.0.0
typescript>=4.9.0
@mui/material>=5.0.0
@emotion/react>=11.0.0
@emotion/styled>=11.0.0
react-router-dom>=6.0.0
axios>=0.27.0
recharts>=2.5.0
```

## 🚀 Deployment

### Environment Variables
Create a `.env` file in the backend directory:
```env
DATABASE_URL=sqlite:///./devtrack.db
SECRET_KEY=your-super-secret-jwt-key
```

### Production Build
```bash
# Build frontend for production
cd frontend
npm run build

# Start backend in production mode
cd ../backend
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## 📈 Performance

- **Real-time Updates** - WebSocket connections for instant synchronization
- **Optimized Queries** - Efficient SQLAlchemy database operations
- **Lazy Loading** - Component-based code splitting
- **Caching** - Material-UI theme caching for faster rendering

## 🔒 Security

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - Bcrypt password encryption
- **Role-based Access** - Granular permission control
- **CORS Protection** - Configured cross-origin resource sharing
- **Input Validation** - Request validation with Pydantic

## 🧪 Testing

```bash
# Run backend tests
cd backend
pytest

# Run frontend tests
cd frontend
npm test
```

## 📝 Database Schema

### Users
- Role-based user management (Admin, Manager, Developer, Tester)
- Secure password hashing and JWT token handling

### Projects
- Project creation, ownership, and team assignment
- Real-time project status updates

### Tasks
- Task lifecycle management (Todo → In Progress → Review → Done)
- Priority levels and user assignments

### Bugs
- Bug reporting with severity tracking
- Status management and resolution workflow

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Key Achievements

- ✅ **Scalable Architecture** - Supports 50+ concurrent users
- ✅ **Real-time Functionality** - WebSocket integration for live updates
- ✅ **Professional UI** - GitHub-inspired design with premium animations
- ✅ **Secure Authentication** - JWT with role-based access control
- ✅ **Persistent Database** - Automatic setup with sample data
- ✅ **Analytics Dashboard** - Interactive charts and metrics
- ✅ **TypeScript Integration** - Full type safety throughout

## 💡 Future Enhancements

- [ ] File upload functionality
- [ ] Email notifications
- [ ] Advanced search and filtering
- [ ] Team collaboration features
- [ ] Mobile application
- [ ] Docker containerization
- [ ] CI/CD pipeline

## 📧 Contact

For questions and support, please open an issue or contact the development team.

---

**Built with ❤️ using FastAPI and React** - Scalable Development & Bug Management Platform

A full-stack web application for managing development projects, tasks, and bug reports with real-time updates and analytics.

## 🚀 Features

- **User Authentication** - JWT-based auth with role-based access control
- **Project Management** - Create and manage development projects
- **Task Tracking** - Create, assign, and track tasks with status updates
- **Bug Reporting** - Report and track bugs with severity levels
- **Real-time Updates** - WebSocket integration for live updates
- **Analytics Dashboard** - Visual charts and project insights
- **Role-based Access** - Admin, Manager, Developer, and Tester roles
- **Responsive Design** - Modern Material-UI interface

## 🛠️ Technology Stack

### Backend
- **Python 3.8+**
- **FastAPI** - Modern web framework
- **SQLAlchemy** - ORM for database operations
- **PostgreSQL** - Primary database
- **WebSockets** - Real-time communication
- **JWT** - Authentication tokens
- **Uvicorn** - ASGI server

### Frontend
- **React 18** - Frontend framework
- **TypeScript** - Type safety
- **Material-UI (MUI)** - Component library
- **React Router** - Navigation
- **Axios** - HTTP client
- **Recharts** - Data visualization

## 📁 Project Structure

```
DevTrack/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py              # FastAPI application
│   │   ├── models.py            # Database models
│   │   ├── auth.py              # Authentication logic
│   │   ├── database.py          # Database configuration
│   │   └── websocket_manager.py # WebSocket management
│   ├── config.py                # Application configuration
│   └── requirements.txt         # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/          # React components
│   │   ├── contexts/            # React contexts
│   │   ├── App.tsx              # Main application
│   │   └── index.tsx            # Entry point
│   ├── package.json             # Node dependencies
│   └── tsconfig.json            # TypeScript config
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+
- PostgreSQL (optional, can use SQLite for development)

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   
   # Windows
   venv\Scripts\activate
   
   # Linux/Mac
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set environment variables:**
   Create a `.env` file in the backend directory:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/devtrack
   SECRET_KEY=your-super-secret-jwt-key
   REDIS_URL=redis://localhost:6379
   ```

5. **Run the backend:**
   ```bash
   python -m app.main
   # or
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm start
   ```

### Database Setup

The application will automatically create the necessary database tables on first run. For production, consider using Alembic for database migrations.

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
- `DATABASE_URL` - Database connection string
- `SECRET_KEY` - JWT secret key
- `REDIS_URL` - Redis connection string (optional)
- `CORS_ORIGINS` - Allowed CORS origins

#### Frontend
The frontend is configured to connect to `http://localhost:8000` by default. Update the API base URL in `src/contexts/AuthContext.tsx` if needed.

## 📊 API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration

### Projects
- `GET /projects` - List all projects
- `POST /projects` - Create new project (admin/manager only)

### Tasks
- `GET /tasks` - List all tasks
- `POST /tasks` - Create new task
- `PUT /tasks/{id}` - Update task

### Bugs
- `GET /bugs` - List all bugs
- `POST /bugs` - Create new bug report

### Analytics
- `GET /analytics/dashboard` - Get dashboard statistics

### WebSocket
- `WS /ws/{client_id}` - WebSocket connection for real-time updates

## 👥 User Roles

- **Admin** - Full system access, user management
- **Manager** - Project creation, team management
- **Developer** - Task management, bug reporting
- **Tester** - Bug reporting, task testing

## 🔄 Real-time Features

The application uses WebSockets for real-time updates:
- Task status changes
- New bug reports
- Project updates
- Live notifications

## 📈 Analytics

The analytics dashboard provides:
- Project overview charts
- Task completion rates
- Bug status distribution
- Completion trends over time

## 🚀 Deployment

### Backend Deployment
1. Use a production WSGI server like Gunicorn
2. Set up PostgreSQL database
3. Configure environment variables
4. Use reverse proxy (Nginx) for static files

### Frontend Deployment
1. Build the production bundle: `npm run build`
2. Serve static files with a web server
3. Configure proper routing for SPA

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the API endpoints

## 🔮 Future Enhancements

- Email notifications
- File attachments
- Time tracking
- Advanced reporting
- Mobile app
- Integration with Git providers

---

**DevTrack** - Built for efficient development team collaboration! 🚀
