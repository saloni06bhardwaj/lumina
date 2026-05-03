# Lumina - Project Management System

A full-stack project management application with role-based access control, built with React and Node.js.

## 🚀 Quick Deploy to Railway

### Backend Deployment
1. Create new Railway project
2. Add MongoDB database (Railway plugin or Atlas)
3. Set environment variables:
   - `MONGO_URI` - MongoDB connection string
   - `JWT_SECRET` - Random secure string
   - `FRONTEND_URL` - Your frontend URL
   - `NODE_ENV=production`
4. Deploy from `project-management-backend` folder
5. Copy generated backend URL

### Frontend Deployment
1. Create new Railway project
2. Set environment variable:
   - `VITE_API_URL` - Your backend URL + `/api`
3. Deploy from `project-management-frontend` folder
4. Update backend `FRONTEND_URL` with frontend URL

📖 **Detailed Guide**: See [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md)

## Features

- **Authentication & Authorization**
  - JWT-based authentication
  - Role-based access (Admin & Member)
  - Protected routes

- **Project Management**
  - Create, read, update, delete projects
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
- Axios
- Tailwind CSS 4.2.4
- Vite 8.0.10
- Lucide React

### Backend
- Node.js with Express 5.2.1
- MongoDB with Mongoose 9.6.1
- JWT authentication
- Bcrypt password hashing
- CORS enabled

## Local Development

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

```bash
cd project-management-backend
npm install
```

Create `.env` file:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/project_manager
JWT_SECRET=your_secret_key_here
FRONTEND_URL=http://localhost:5173
```

Start server:
```bash
npm start
```

### Frontend Setup

```bash
cd project-management-frontend
npm install
```

Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

Start dev server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register user
- `POST /api/auth/login` - Login user

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## User Roles

- **ADMIN**: Full access to all features
- **MEMBER**: Access to assigned projects and tasks

## Project Structure

```
ethara AI task/
├── project-management-backend/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   ├── railway.json
│   └── .env.example
└── project-management-frontend/
    ├── src/
    ├── public/
    ├── package.json
    ├── railway.json
    ├── nixpacks.toml
    └── .env.example
```

## Environment Variables

### Backend
- `PORT` - Server port (default: 5000)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - JWT secret key
- `FRONTEND_URL` - Frontend URL for CORS
- `NODE_ENV` - Environment (production/development)

### Frontend
- `VITE_API_URL` - Backend API URL

## Deployment Options

- **Railway** (Recommended) - See [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md)
- **Vercel** (Frontend) + Railway (Backend)
- **Netlify** (Frontend) + Railway (Backend)
- **Heroku** (Both)

## License

ISC

## Support

For issues or questions, please open an issue in the repository.
