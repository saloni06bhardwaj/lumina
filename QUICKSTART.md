# Quick Start Guide

## 🚀 Deploy to Railway (5 minutes)

### Step 1: Backend
1. Go to [Railway](https://railway.app) → New Project
2. Add MongoDB database
3. Deploy `project-management-backend` folder
4. Add environment variables:
   ```
   JWT_SECRET=your_random_secret_key_123
   FRONTEND_URL=https://your-frontend.railway.app
   NODE_ENV=production
   ```
5. Copy backend URL (e.g., `https://backend.railway.app`)

### Step 2: Frontend
1. Railway → New Project
2. Deploy `project-management-frontend` folder
3. Add environment variable:
   ```
   VITE_API_URL=https://your-backend.railway.app/api
   ```
4. Copy frontend URL

### Step 3: Update Backend
1. Go back to backend project
2. Update `FRONTEND_URL` with your frontend URL
3. Redeploy if needed

### Done! 🎉
Visit your frontend URL and start using Lumina!

---

## 💻 Local Development

### Backend
```bash
cd project-management-backend
npm install
# Create .env file with MONGO_URI, JWT_SECRET, FRONTEND_URL
npm start
```

### Frontend
```bash
cd project-management-frontend
npm install
# Create .env file with VITE_API_URL
npm run dev
```

---

## 🔑 Default User
After signup, users are created as MEMBER role by default.
To create an ADMIN user, manually update the role in MongoDB.

---

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/project_manager
JWT_SECRET=your_secret_key_here
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🐛 Troubleshooting

### CORS Error
- Ensure `FRONTEND_URL` in backend matches your frontend URL
- Restart backend after updating environment variables

### MongoDB Connection Error
- Check `MONGO_URI` is correct
- For Railway: Use MongoDB plugin or Atlas connection string
- For local: Ensure MongoDB is running

### API Not Found (404)
- Verify `VITE_API_URL` includes `/api` at the end
- Check backend is running and accessible

### Build Errors
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version (v14+)

---

## 📚 More Information

- Full deployment guide: [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md)
- Project README: [README.md](./README.md)
