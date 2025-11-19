#!/bin/bash

# Systemd Service Setup Script for Backend

set -e

echo "⚙️  Setting up systemd service for backend..."

# Create systemd service file
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

# Environment variables
Environment="JAVA_OPTS=-Xmx512m -Xms256m"

# Logging
StandardOutput=journal
StandardError=journal
SyslogIdentifier=portfolio-backend

[Install]
WantedBy=multi-user.target
EOF

# Create environment file for secrets
sudo tee /var/www/portfolio/backend/.env > /dev/null <<'EOF'
# Database Configuration
DB_USERNAME=portfolio_user
DB_PASSWORD=change_this_password

# JWT Secret (Generate a random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# CORS Origins
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
EOF

echo ""
echo "⚠️  IMPORTANT: Edit the environment file with your actual credentials:"
echo "sudo nano /var/www/portfolio/backend/.env"
echo ""
echo "After editing, load the environment variables into the service:"
echo "Add this line to /etc/systemd/system/portfolio-backend.service under [Service]:"
echo "EnvironmentFile=/var/www/portfolio/backend/.env"
echo ""

# Reload systemd
sudo systemctl daemon-reload

echo "✓ Systemd service created"
echo ""
echo "To manage the service:"
echo "  Start:   sudo systemctl start portfolio-backend"
echo "  Stop:    sudo systemctl stop portfolio-backend"
echo "  Restart: sudo systemctl restart portfolio-backend"
echo "  Status:  sudo systemctl status portfolio-backend"
echo "  Enable:  sudo systemctl enable portfolio-backend (start on boot)"
echo "  Logs:    sudo journalctl -u portfolio-backend -f"
echo ""
