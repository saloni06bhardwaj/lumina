# Railway Deployment Guide

## Prerequisites
- Railway account (https://railway.app)
- MongoDB Atlas account (https://www.mongodb.com/cloud/atlas) or Railway MongoDB plugin
- GitHub repository (optional but recommended)

## Backend Deployment

### Step 1: Create New Project on Railway
1. Go to https://railway.app
2. Click "New Project"
3. Choose "Deploy from GitHub repo" or "Empty Project"

### Step 2: Add MongoDB Database
**Option A: Railway MongoDB Plugin**
1. Click "New" → "Database" → "Add MongoDB"
2. Railway will automatically create `MONGO_URL` variable

**Option B: MongoDB Atlas**
1. Create cluster on MongoDB Atlas
2. Get connection string
3. Add to Railway environment variables

### Step 3: Configure Environment Variables
Add these variables in Railway dashboard:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_random_string
FRONTEND_URL=your_frontend_url
NODE_ENV=production
```

### Step 4: Deploy Backend
1. Connect your GitHub repo or use Railway CLI
2. Select `project-management-backend` folder as root
3. Railway will auto-detect Node.js and deploy
4. Copy the generated backend URL (e.g., `https://your-app.railway.app`)

## Frontend Deployment

### Step 1: Create New Project on Railway
1. Click "New Project" again
2. Choose "Deploy from GitHub repo" or "Empty Project"

### Step 2: Configure Environment Variables
Add this variable in Railway dashboard:
```
VITE_API_URL=https://your-backend-url.railway.app/api
```

### Step 3: Configure Build Settings
In Railway dashboard, set:
- **Root Directory**: `project-management-frontend`
- **Build Command**: `npm run build`
- **Start Command**: `npm run preview` or use a static server

### Step 4: Update package.json (if needed)
Add preview script to frontend package.json:
```json
"scripts": {
  "preview": "vite preview --host 0.0.0.0 --port $PORT"
}
```

### Step 5: Deploy Frontend
1. Railway will build and deploy automatically
2. Copy the generated frontend URL

## Post-Deployment

### Update CORS Settings
Update backend `FRONTEND_URL` environment variable with your deployed frontend URL.

### Test the Application
1. Visit your frontend URL
2. Try signup/login
3. Test project and task creation

## Alternative: Deploy Frontend on Vercel/Netlify

### Vercel
1. Import project from GitHub
2. Set root directory to `project-management-frontend`
3. Add environment variable: `VITE_API_URL=https://your-backend-url.railway.app/api`
4. Deploy

### Netlify
1. Import project from GitHub
2. Set base directory to `project-management-frontend`
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variable: `VITE_API_URL=https://your-backend-url.railway.app/api`
6. Deploy

## Troubleshooting

### Backend Issues
- Check Railway logs for errors
- Verify MongoDB connection string
- Ensure all environment variables are set
- Check if PORT is correctly configured

### Frontend Issues
- Verify VITE_API_URL is correct
- Check browser console for CORS errors
- Ensure backend FRONTEND_URL includes your frontend domain
- Clear browser cache

### CORS Errors
- Add your frontend URL to backend FRONTEND_URL variable
- Restart backend service after updating environment variables

## Monitoring
- Use Railway dashboard to monitor logs
- Set up alerts for downtime
- Monitor MongoDB Atlas metrics

## Cost Optimization
- Railway offers $5 free credit monthly
- MongoDB Atlas has free tier (512MB)
- Consider upgrading for production use
