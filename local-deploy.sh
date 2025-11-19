#!/bin/bash

# Local Build & Deploy Script
# Builds the application locally and deploys to remote server

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration
read -p "Enter server IP/hostname: " SERVER_HOST
read -p "Enter SSH user [root]: " SSH_USER
SSH_USER=${SSH_USER:-root}

REMOTE_DIR="/var/www/portfolio"
PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo ""
echo -e "${BLUE}🚀 Starting Portfolio Deployment...${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Step 1: Clean previous builds
echo -e "${BLUE}🧹 Cleaning previous builds...${NC}"
rm -rf "$PROJECT_DIR/backend/target"
rm -rf "$PROJECT_DIR/frontend/dist"
rm -rf "$PROJECT_DIR/deploy-temp"
echo -e "${GREEN}✓ Cleaned${NC}"
echo ""

# Step 2: Build Backend
echo -e "${BLUE}📦 Building Backend (Maven)...${NC}"
cd "$PROJECT_DIR/backend"
mvn clean package -DskipTests
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Backend build successful${NC}"
else
    echo -e "${RED}✗ Backend build failed${NC}"
    exit 1
fi
echo ""

# Step 3: Build Frontend
echo -e "${BLUE}📦 Building Frontend (Vite)...${NC}"
cd "$PROJECT_DIR/frontend"
npm install --silent
npm run build
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Frontend build successful${NC}"
else
    echo -e "${RED}✗ Frontend build failed${NC}"
    exit 1
fi
echo ""

# Step 4: Prepare deployment package
echo -e "${BLUE}📋 Preparing deployment package...${NC}"
cd "$PROJECT_DIR"
mkdir -p deploy-temp/backend
mkdir -p deploy-temp/frontend

cp backend/target/portfolio-backend-*.jar deploy-temp/backend/portfolio-backend.jar
cp -r frontend/dist/* deploy-temp/frontend/

echo -e "${GREEN}✓ Package prepared${NC}"
echo ""

# Step 5: Upload to server
echo -e "${BLUE}📤 Uploading to server ${SERVER_HOST}...${NC}"

# Create remote directories
ssh ${SSH_USER}@${SERVER_HOST} "sudo mkdir -p ${REMOTE_DIR}/backend ${REMOTE_DIR}/frontend"

# Upload files
scp deploy-temp/backend/portfolio-backend.jar ${SSH_USER}@${SERVER_HOST}:/tmp/
scp -r deploy-temp/frontend/* ${SSH_USER}@${SERVER_HOST}:/tmp/frontend-deploy/

# Move files with proper permissions
ssh ${SSH_USER}@${SERVER_HOST} << 'ENDSSH'
sudo mv /tmp/portfolio-backend.jar /var/www/portfolio/backend/
sudo rm -rf /var/www/portfolio/frontend/*
sudo mv /tmp/frontend-deploy/* /var/www/portfolio/frontend/
sudo chown -R www-data:www-data /var/www/portfolio
sudo chmod -R 755 /var/www/portfolio
rm -rf /tmp/frontend-deploy
ENDSSH

echo -e "${GREEN}✓ Files uploaded${NC}"
echo ""

# Step 6: Restart services
echo -e "${BLUE}🔄 Restarting services...${NC}"
ssh ${SSH_USER}@${SERVER_HOST} << 'ENDSSH'
if systemctl is-active --quiet portfolio-backend; then
    echo "Restarting backend service..."
    sudo systemctl restart portfolio-backend
    sleep 3
    if systemctl is-active --quiet portfolio-backend; then
        echo "✓ Backend service running"
    else
        echo "✗ Backend service failed to start"
        sudo journalctl -u portfolio-backend -n 20 --no-pager
    fi
else
    echo "⚠ Backend service not configured (run server-setup.sh first)"
fi

if systemctl is-active --quiet nginx; then
    sudo systemctl reload nginx
    echo "✓ Nginx reloaded"
fi
ENDSSH

echo ""

# Step 7: Cleanup
echo -e "${BLUE}🧹 Cleaning up temporary files...${NC}"
cd "$PROJECT_DIR"
rm -rf deploy-temp
rm -rf backend/target
rm -rf frontend/dist
echo -e "${GREEN}✓ Cleanup complete${NC}"
echo ""

# Summary
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✓ Deployment Complete!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "Deployment Summary:"
echo "  Server:   ${SERVER_HOST}"
echo "  Frontend: ${REMOTE_DIR}/frontend"
echo "  Backend:  ${REMOTE_DIR}/backend/portfolio-backend.jar"
echo ""
echo "Next Steps:"
echo "  1. Visit your site at: http://${SERVER_HOST}"
echo "  2. Admin panel: http://${SERVER_HOST}/admin/login"
echo "  3. Check logs: ssh ${SSH_USER}@${SERVER_HOST} 'sudo journalctl -u portfolio-backend -f'"
echo ""
