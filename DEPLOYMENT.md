# QIROX - Render Deployment Guide

## Prerequisites
- Node.js 18+ 
- A Render.com account

## Deployment Steps

### Option 1: Using render.yaml (Recommended)
1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Go to [Render Dashboard](https://dashboard.render.com)
3. Click "New" → "Blueprint"
4. Connect your repository
5. Render will automatically detect `render.yaml` and configure everything

### Option 2: Manual Setup
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New" → "Web Service"
3. Connect your repository
4. Configure:
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
5. Add Environment Variables:
   - `NODE_ENV`: `production`
   - `SESSION_SECRET`: (generate a random string)

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NODE_ENV` | Yes | Set to `production` |
| `SESSION_SECRET` | Yes | Random string for session encryption |
| `PORT` | No | Render sets this automatically |

## Build Output
- Client files: `dist/public/`
- Server bundle: `dist/index.cjs`

## Troubleshooting

### Build Fails
- Ensure Node.js version is 18+
- Run `npm install && npm run build` locally to test

### App Doesn't Start
- Check that `SESSION_SECRET` is set
- View logs in Render dashboard

### Static Files Not Loading
- Verify `dist/public/` folder exists after build
- Check the build logs for any errors
