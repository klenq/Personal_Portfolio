#!/bin/bash

# MySQL Database Setup Script

set -e

echo "🗄️  Setting up MySQL database for Portfolio..."

# Check if MySQL is installed
if ! command -v mysql &> /dev/null; then
    echo "MySQL is not installed. Installing..."
    sudo apt-get update
    sudo apt-get install -y mysql-server
    sudo systemctl start mysql
    sudo systemctl enable mysql
fi

# Prompt for database credentials
read -p "Enter database name [portfolio]: " DB_NAME
DB_NAME=${DB_NAME:-portfolio}

read -p "Enter database username [portfolio_user]: " DB_USER
DB_USER=${DB_USER:-portfolio_user}

read -sp "Enter database password: " DB_PASS
echo ""

# Create database and user
sudo mysql <<EOF
CREATE DATABASE IF NOT EXISTS ${DB_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS '${DB_USER}'@'localhost' IDENTIFIED BY '${DB_PASS}';
GRANT ALL PRIVILEGES ON ${DB_NAME}.* TO '${DB_USER}'@'localhost';
FLUSH PRIVILEGES;
EOF

echo "✓ Database created successfully"
echo ""
echo "Database credentials:"
echo "  Database: ${DB_NAME}"
echo "  Username: ${DB_USER}"
echo "  Password: ******** (saved)"
echo ""
echo "⚠️  Update these in your environment variables:"
echo "  DB_USERNAME=${DB_USER}"
echo "  DB_PASSWORD=${DB_PASS}"
echo ""
