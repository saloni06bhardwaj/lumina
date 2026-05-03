# ✅ Pre-Deployment Checklist

## Frontend Deployment (Railway)

### 1. Prerequisites
- ✅ Backend already deployed on Railway
- ✅ Backend URL available
- ✅ `package-lock.json` regenerated with express dependency
- ✅ Node.js 20+ specified in package.json and .nvmrc

### 2. Environment Variables Needed
```
VITE_API_URL=https://your-backend-url.railway.app/api
```

### 3. Railway Configuration
- **Root Directory**: `project-management-frontend`
- **Node Version**: 20+ (auto-detected from .nvmrc and package.json)
- **Build Command**: `npm ci && npm run build` (Railway auto-detects)
- **Start Command**: `npm run start` (specified in railway.json)

### 4. Deployment Steps

1. **Push to GitHub** (if using GitHub deployment)
   ```bash
   git add .
   git commit -m "Prepare frontend for Railway deployment"
   git push
   ```

2. **Create Railway Project**
   - Go to https://railway.app/dashboard
   - Click "New Project"
   - Select "Deploy from GitHub repo" or "Empty Project"

3. **Configure Project**
   - Set root directory: `project-management-frontend`
   - Railway will detect Node.js 20 from .nvmrc

4. **Add Environment Variable**
   - Go to Variables tab
   - Add: `VITE_API_URL=https://your-backend-url.railway.app/api`

5. **Deploy**
   - Click "Deploy"
   - Wait for build (2-3 minutes)
   - Copy frontend URL

6. **Update Backend CORS**
   - Go to backend Railway project
   - Update: `FRONTEND_URL=https://your-frontend-url.railway.app`

### 5. Verify Deployment

Visit your frontend URL and test:
- ✅ Signup page loads
- ✅ Can create account
- ✅ Can login
- ✅ Dashboard loads
- ✅ Can create projects/tasks

---

## Common Issues

### Issue: `npm ci` fails with package-lock.json sync error
**Solution**: ✅ Already fixed - package-lock.json regenerated

### Issue: Build fails with Node.js version error
**Solution**: ✅ Already fixed - Node.js 20+ specified in:
- package.json (engines field)
- .nvmrc file
- railway.json (nixpacksPlan)

### Issue: CORS error after deployment
**Solution**: Update backend `FRONTEND_URL` environment variable

### Issue: API connection failed
**Solution**: Verify `VITE_API_URL` has `/api` at the end

---

## Files Changed for Deployment

✅ `package.json` - Added express, engines field
✅ `package-lock.json` - Regenerated with npm install
✅ `server.js` - Production server for Railway
✅ `railway.json` - Node.js 20 configuration
✅ `.nvmrc` - Node.js version specification
✅ `.env.example` - Environment variable template
✅ `vite.config.js` - Development server config

---

## Next Steps After Deployment

1. Test all features thoroughly
2. Monitor Railway logs for errors
3. Set up custom domain (optional)
4. Configure environment for production
5. Set up monitoring/alerts

---

## Support

- Railway Docs: https://docs.railway.app
- Deployment Guide: See RAILWAY_DEPLOYMENT.md
- Quick Start: See QUICKSTART.md
