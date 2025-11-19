-- Create Admin User for Portfolio Application
-- Username: admin
-- Password: admin123

USE portfoliodb;

-- Delete existing admin user if exists (to avoid duplicates)
DELETE FROM users WHERE username = 'admin';

-- Insert admin user with bcrypt-encoded password for 'admin123'
INSERT INTO users (username, password, email, role, created_at)
VALUES (
    'admin',
    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
    'admin@portfolio.com',
    'ADMIN',
    NOW()
);

-- Verify the user was created
SELECT id, username, email, role, created_at FROM users WHERE username = 'admin';
