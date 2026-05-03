# Lumina - Project Management System

A full-stack project management application with role-based access control, built with React and Node.js.

## Features

- **Authentication & Authorization**
  - User signup and login
  - JWT-based authentication
  - Role-based access (Admin & Member)
  - Protected routes

- **Project Management**
  - Create, read, update, and delete projects
  - Assign projects to team members
  - Track project status

- **Task Management**
  - Create and manage tasks within projects
  - Assign tasks to members
  - Track task progress

- **Role-Based Dashboards**
  - Admin dashboard for full system control
  - Member dashboard for assigned projects and tasks

## Tech Stack

### Frontend
- React 19.2.5
- React Router DOM 7.14.2
- Axios for API calls
- Tailwind CSS 4.2.4
- Vite 8.0.10
- Lucide React (icons)

### Backend
- Node.js with Express 5.2.1
- MongoDB with Mongoose 9.6.1
- JWT for authentication
- Bcrypt for password hashing
- CORS enabled

## Project Structure

```
ethara AI task/
├── project-management-backend/
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Project.js
│   │   ├── Task.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── project.js
│   │   └── task.js
│   ├── .env
│   ├── package.json
│   └── server.js
└── project-management-frontend/
    ├── public/
    ├── src/
    │   ├── api/
    │   ├── assets/
    │   ├── components/
    │   ├── pages/
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd "ethara AI task"
```

### 2. Backend Setup

```bash
cd project-management-backend
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/project_manager
JWT_SECRET=your_secret_key_here
```

Start the backend server:

```bash
node server.js
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd project-management-frontend
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## User Roles

- **ADMIN**: Full access to create, edit, and delete projects and tasks
- **MEMBER**: Access to assigned projects and tasks

## Default Credentials

After signup, users are registered as MEMBER by default. To create an admin user, modify the role in the database or update the signup logic.

## Development

### Frontend Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Backend Scripts

```bash
node server.js   # Start server
```

## Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 5000)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

ISC

## Contact

For questions or support, please open an issue in the repository.
