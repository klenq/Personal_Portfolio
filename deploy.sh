#!/bin/bash

# Portfolio Deployment Script
# This script builds and deploys both frontend and backend

set -e  # Exit on error

echo "🚀 Starting Portfolio Deployment..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration
DEPLOY_DIR="/var/www/portfolio"
BACKEND_JAR="backend/target/portfolio-backend.jar"
FRONTEND_DIST="frontend/dist"

# Step 1: Build Backend
echo -e "${BLUE}📦 Building Backend...${NC}"
cd backend
mvn clean package -DskipTests
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Backend build successful${NC}"
else
    echo -e "${RED}✗ Backend build failed${NC}"
    exit 1
fi
cd ..

# Step 2: Build Frontend
echo -e "${BLUE}📦 Building Frontend...${NC}"
cd frontend
npm install
npm run build
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Frontend build successful${NC}"
else
    echo -e "${RED}✗ Frontend build failed${NC}"
    exit 1
fi
cd ..

# Step 3: Create deployment directory
echo -e "${BLUE}📁 Creating deployment directory...${NC}"
sudo mkdir -p $DEPLOY_DIR/backend
sudo mkdir -p $DEPLOY_DIR/frontend

# Step 4: Copy files
echo -e "${BLUE}📋 Copying files...${NC}"
sudo cp $BACKEND_JAR $DEPLOY_DIR/backend/portfolio-backend.jar
sudo cp -r $FRONTEND_DIST/* $DEPLOY_DIR/frontend/

# Step 5: Set permissions
echo -e "${BLUE}🔐 Setting permissions...${NC}"
sudo chown -R $USER:$USER $DEPLOY_DIR
sudo chmod -R 755 $DEPLOY_DIR

echo ""
echo -e "${GREEN}✓ Deployment preparation complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Configure your environment variables in /etc/environment or .env"
echo "2. Set up Nginx (run: sudo ./setup-nginx.sh)"
echo "3. Set up systemd service (run: sudo ./setup-service.sh)"
echo "4. Start the backend service (run: sudo systemctl start portfolio-backend)"
echo ""
