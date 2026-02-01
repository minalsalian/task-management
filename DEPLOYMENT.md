# Deployment Guide

This document provides instructions for deploying the Task Management Application to various platforms.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Heroku Deployment](#heroku-deployment)
- [Railway Deployment](#railway-deployment)
- [Render Deployment](#render-deployment)
- [VPS Deployment (DigitalOcean, AWS, etc.)](#vps-deployment)

## Prerequisites

Before deploying, ensure you have:
- Git repository with your code
- Database hosted (ClearDB, JawsDB, or managed MySQL)
- Node.js application tested locally

## Environment Variables

Make sure to set these environment variables on your hosting platform:

```
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=task_management
DB_PORT=3306
PORT=3000
JWT_SECRET=your-secure-secret-key-here
JWT_EXPIRES_IN=7d
```

**Important:** Never commit `.env` file to Git! Use your platform's environment variable settings.

---

## Heroku Deployment

### 1. Install Heroku CLI
```bash
npm install -g heroku
```

### 2. Login to Heroku
```bash
heroku login
```

### 3. Create Heroku App
```bash
heroku create your-app-name
```

### 4. Add MySQL Database (ClearDB)
```bash
heroku addons:create cleardb:ignite
```

Get database credentials:
```bash
heroku config:get CLEARDB_DATABASE_URL
```

The URL format is: `mysql://username:password@hostname/database_name`

### 5. Set Environment Variables
```bash
heroku config:set JWT_SECRET=your-secret-key
heroku config:set JWT_EXPIRES_IN=7d
```

### 6. Create Procfile
Create `Procfile` in project root:
```
web: node server.js
```

### 7. Deploy
```bash
git add .
git commit -m "Prepare for Heroku deployment"
git push heroku main
```

### 8. Run Database Schema
Connect to Heroku MySQL and run `database/schema.sql`:
```bash
heroku run bash
# Then manually connect to MySQL or use Heroku console
```

### 9. Open Your App
```bash
heroku open
```

---

## Railway Deployment

### 1. Sign up at [Railway.app](https://railway.app)

### 2. Create New Project
- Click "New Project"
- Select "Deploy from GitHub repo"
- Connect your repository

### 3. Add MySQL Database
- Click "New" → "Database" → "MySQL"
- Railway will automatically provision a MySQL database

### 4. Set Environment Variables
In your project settings, add:
- `DB_HOST` (from MySQL plugin)
- `DB_USER` (from MySQL plugin)
- `DB_PASSWORD` (from MySQL plugin)
- `DB_NAME` (from MySQL plugin)
- `DB_PORT` (usually 3306)
- `JWT_SECRET` (your secret key)
- `JWT_EXPIRES_IN` (7d)

### 5. Configure Start Command
In Settings → Deploy:
- Build Command: `npm install`
- Start Command: `npm start`

### 6. Setup Database Schema
- Connect to Railway MySQL using provided credentials
- Run the SQL from `database/schema.sql`

### 7. Deploy
Railway automatically deploys when you push to your connected branch.

---

## Render Deployment

### 1. Sign up at [Render.com](https://render.com)

### 2. Create Web Service
- Click "New" → "Web Service"
- Connect your GitHub repository

### 3. Configure Service
- **Name:** your-app-name
- **Environment:** Node
- **Build Command:** `npm install`
- **Start Command:** `npm start`

### 4. Add MySQL Database
Option 1: Use external MySQL (recommended)
- Use PlanetScale, Amazon RDS, or other managed MySQL

Option 2: Use PostgreSQL (requires schema changes)
- Render offers managed PostgreSQL

### 5. Set Environment Variables
Add environment variables in the Render dashboard:
```
DB_HOST=your-mysql-host
DB_USER=your-mysql-user
DB_PASSWORD=your-mysql-password
DB_NAME=task_management
DB_PORT=3306
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
```

### 6. Deploy
Click "Create Web Service" - Render will automatically deploy.

---

## VPS Deployment (DigitalOcean, AWS, Linode, etc.)

### 1. Setup Server
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install MySQL
sudo apt install mysql-server -y
```

### 2. Configure MySQL
```bash
sudo mysql_secure_installation

# Create database
sudo mysql -u root -p
```

In MySQL console:
```sql
CREATE DATABASE task_management;
CREATE USER 'taskuser'@'localhost' IDENTIFIED BY 'your-password';
GRANT ALL PRIVILEGES ON task_management.* TO 'taskuser'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

Import schema:
```bash
mysql -u taskuser -p task_management < database/schema.sql
```

### 3. Deploy Application
```bash
# Clone repository
git clone https://github.com/yourusername/task-management.git
cd task-management

# Install dependencies
npm install

# Create .env file
nano .env
```

Add your environment variables to `.env`.

### 4. Use PM2 for Process Management
```bash
# Install PM2
sudo npm install -g pm2

# Start application
pm2 start server.js --name task-app

# Setup auto-restart on reboot
pm2 startup
pm2 save
```

### 5. Configure Nginx (Reverse Proxy)
```bash
sudo apt install nginx -y
sudo nano /etc/nginx/sites-available/task-app
```

Add configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/task-app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 6. Setup SSL with Let's Encrypt
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com
```

---

## Post-Deployment Checklist

- [ ] Database schema imported successfully
- [ ] Environment variables set correctly
- [ ] Application starts without errors
- [ ] Can access the application via URL
- [ ] Authentication works (register/login)
- [ ] CRUD operations functional
- [ ] SSL certificate installed (production)
- [ ] Monitoring setup (optional)

## Troubleshooting

### Database Connection Issues
- Verify database credentials
- Check if database server is accessible
- Ensure firewall rules allow connections

### Application Won't Start
- Check logs for errors
- Verify all environment variables are set
- Ensure port is not already in use

### 502 Bad Gateway (Nginx)
- Check if Node.js app is running
- Verify proxy_pass points to correct port
- Check PM2 logs: `pm2 logs`

---

## Monitoring & Maintenance

### View Logs
```bash
# PM2 logs
pm2 logs task-app

# System logs
journalctl -u nginx -f
```

### Update Application
```bash
git pull origin main
npm install
pm2 restart task-app
```

### Database Backups
```bash
# Backup
mysqldump -u taskuser -p task_management > backup_$(date +%Y%m%d).sql

# Restore
mysql -u taskuser -p task_management < backup_20260201.sql
```

---

## Support

For deployment issues, check:
- Platform documentation (Heroku, Railway, Render)
- Application logs
- Database connection status
- Environment variables configuration
