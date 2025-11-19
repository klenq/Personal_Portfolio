#!/bin/bash

# Server Setup Script - One-time server configuration
# Run this script ON the server (Ubuntu)

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo ""
echo -e "${BLUE}🔧 Portfolio Server Setup${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "This script will configure your Ubuntu server for the portfolio application."
echo ""

# Check if running as root or with sudo
if [[ $EUID -ne 0 ]] && ! sudo -n true 2>/dev/null; then
   echo -e "${RED}This script requires sudo privileges${NC}"
   exit 1
fi

# ============================================================================
# Step 1: Update System
# ============================================================================
echo -e "${BLUE}[1/7] 📦 Updating system packages...${NC}"
sudo apt-get update -qq
sudo apt-get upgrade -y -qq
echo -e "${GREEN}✓ System updated${NC}"
echo ""

# ============================================================================
# Step 2: Install Dependencies
# ============================================================================
echo -e "${BLUE}[2/7] 📚 Installing dependencies...${NC}"

# Check and install Java 17
if ! command -v java &> /dev/null || ! java -version 2>&1 | grep -q "17"; then
    echo "Installing Java 17..."
    sudo apt-get install -y openjdk-17-jre-headless
fi

# Check and install MySQL
if ! command -v mysql &> /dev/null; then
    echo "Installing MySQL..."
    sudo apt-get install -y mysql-server
    sudo systemctl start mysql
    sudo systemctl enable mysql
fi

# Check and install Nginx
if ! command -v nginx &> /dev/null; then
    echo "Installing Nginx..."
    sudo apt-get install -y nginx
    sudo systemctl start nginx
    sudo systemctl enable nginx
fi

echo -e "${GREEN}✓ Dependencies installed${NC}"
echo ""

# ============================================================================
# Step 3: Database Setup
# ============================================================================
echo -e "${BLUE}[3/7] 🗄️  Setting up MySQL database...${NC}"

read -p "Enter database name [portfoliodb]: " DB_NAME
DB_NAME=${DB_NAME:-portfoliodb}

read -p "Enter database username [p_user]: " DB_USER
DB_USER=${DB_USER:-p_user}

while true; do
    read -sp "Enter database password: " DB_PASS
    echo ""
    read -sp "Confirm password: " DB_PASS_CONFIRM
    echo ""
    if [ "$DB_PASS" = "$DB_PASS_CONFIRM" ]; then
        break
    else
        echo -e "${RED}Passwords don't match. Try again.${NC}"
    fi
done

# Create database and user
sudo mysql <<EOF
CREATE DATABASE IF NOT EXISTS ${DB_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS '${DB_USER}'@'localhost' IDENTIFIED BY '${DB_PASS}';
GRANT ALL PRIVILEGES ON ${DB_NAME}.* TO '${DB_USER}'@'localhost';
FLUSH PRIVILEGES;
EOF

echo -e "${GREEN}✓ Database created${NC}"
echo ""

# ============================================================================
# Step 4: Create Deployment Directories
# ============================================================================
echo -e "${BLUE}[4/7] 📁 Creating deployment directories...${NC}"

sudo mkdir -p /var/www/portfolio/backend
sudo mkdir -p /var/www/portfolio/frontend
sudo chown -R www-data:www-data /var/www/portfolio
sudo chmod -R 755 /var/www/portfolio

echo -e "${GREEN}✓ Directories created${NC}"
echo ""

# ============================================================================
# Step 5: Configure Backend Environment
# ============================================================================
echo -e "${BLUE}[5/7] ⚙️  Configuring backend environment...${NC}"

# Generate JWT secret
JWT_SECRET=$(openssl rand -base64 64 | tr -d '\n')

read -p "Enter your domain name (e.g., example.com): " DOMAIN_NAME

# Create .env file
sudo tee /var/www/portfolio/backend/.env > /dev/null <<EOF
# Database Configuration
SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/${DB_NAME}?useSSL=false&serverTimezone=UTC
DB_USERNAME=${DB_USER}
DB_PASSWORD=${DB_PASS}

# JWT Secret
JWT_SECRET=${JWT_SECRET}

# CORS Origins
CORS_ORIGINS=http://${DOMAIN_NAME},https://${DOMAIN_NAME},http://www.${DOMAIN_NAME},https://www.${DOMAIN_NAME}
EOF

sudo chown www-data:www-data /var/www/portfolio/backend/.env
sudo chmod 600 /var/www/portfolio/backend/.env

echo -e "${GREEN}✓ Environment configured${NC}"
echo ""

# ============================================================================
# Step 6: Create Systemd Service
# ============================================================================
echo -e "${BLUE}[6/7] 🔧 Creating systemd service...${NC}"

sudo tee /etc/systemd/system/portfolio-backend.service > /dev/null <<'EOF'
[Unit]
Description=Portfolio Backend Service
After=network.target mysql.service

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/portfolio/backend
ExecStart=/usr/bin/java -jar -Dspring.profiles.active=prod portfolio-backend.jar
Restart=always
RestartSec=10

# Environment variables from file
EnvironmentFile=/var/www/portfolio/backend/.env

# JVM settings
Environment="JAVA_OPTS=-Xmx512m -Xms256m"

# Logging
StandardOutput=journal
StandardError=journal
SyslogIdentifier=portfolio-backend

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable portfolio-backend

echo -e "${GREEN}✓ Service created${NC}"
echo ""

# ============================================================================
# Step 7: Configure Nginx
# ============================================================================
echo -e "${BLUE}[7/7] 🌐 Configuring Nginx...${NC}"

sudo tee /etc/nginx/sites-available/portfolio > /dev/null <<EOF
server {
    listen 80;
    listen [::]:80;
    server_name ${DOMAIN_NAME} www.${DOMAIN_NAME};

    # Frontend - React App
    root /var/www/portfolio/frontend;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;

    # Frontend routes
    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # Backend API proxy
    location /api {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

# Enable the site
sudo ln -sf /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test and reload Nginx
sudo nginx -t
sudo systemctl reload nginx

echo -e "${GREEN}✓ Nginx configured${NC}"
echo ""

# ============================================================================
# Firewall Configuration (Optional)
# ============================================================================
echo -e "${BLUE}🔒 Configuring firewall...${NC}"
if command -v ufw &> /dev/null; then
    sudo ufw allow 'Nginx Full'
    sudo ufw allow OpenSSH
    echo -e "${GREEN}✓ Firewall rules added${NC}"
else
    echo -e "${YELLOW}⚠ ufw not installed, skipping firewall configuration${NC}"
fi
echo ""

# ============================================================================
# Summary
# ============================================================================
echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✓ Server Setup Complete!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "Configuration Summary:"
echo "  Database:    ${DB_NAME}"
echo "  DB User:     ${DB_USER}"
echo "  Domain:      ${DOMAIN_NAME}"
echo "  Frontend:    /var/www/portfolio/frontend"
echo "  Backend:     /var/www/portfolio/backend"
echo "  Config:      /var/www/portfolio/backend/.env"
echo ""
echo "Next Steps:"
echo ""
echo "  1. On your LOCAL machine, run the deployment script:"
echo "     ./local-deploy.sh"
echo ""
echo "  2. After deployment, start the backend service:"
echo "     sudo systemctl start portfolio-backend"
echo ""
echo "  3. Check service status:"
echo "     sudo systemctl status portfolio-backend"
echo ""
echo "  4. View logs:"
echo "     sudo journalctl -u portfolio-backend -f"
echo ""
echo "  5. Access your site:"
echo "     http://${DOMAIN_NAME}"
echo "     http://${DOMAIN_NAME}/admin/login"
echo ""
echo "  Default admin credentials:"
echo "     Username: admin"
echo "     Password: admin123"
echo "     (Change after first login!)"
echo ""
echo "Optional: Enable HTTPS with Let's Encrypt:"
echo "  sudo apt-get install certbot python3-certbot-nginx"
echo "  sudo certbot --nginx -d ${DOMAIN_NAME} -d www.${DOMAIN_NAME}"
echo ""
