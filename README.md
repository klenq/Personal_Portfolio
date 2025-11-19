# Personal Portfolio

A Swiss-inspired modernism, Programmers portfolio website featuring a dark geometric design with teal accents. Built with React (frontend) and Spring Boot (backend), this portfolio showcases projects, experience, and contact information with elegant animations and accessibility features.

![Portfolio Screenshot](https://via.placeholder.com/800x400?text=Portfolio+Screenshot)

## Features

### Frontend
- 🎨 **Modern Dark Design** - Geometric shadows, teal accents, and smooth animations
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop
- ♿ **Accessible** - WCAG AA compliant with keyboard navigation and screen reader support
- 🎯 **Single Page Layout** - Sticky sidebar navigation with scroll detection
- 📊 **Project Archive** - Dedicated page for all your projects in table/card view
- ⚡ **Fast & Optimized** - Built with Vite for lightning-fast development and production builds

### Backend
- 🔐 **Secure Authentication** - JWT-based admin authentication
- 📝 **Content Management** - Admin panel to manage projects and personal info
- 💾 **Database Support** - H2 (development) and MySQL (production)
- 🔄 **RESTful API** - Clean API architecture with proper separation of concerns

## Tech Stack

**Frontend:**
- React 18.2
- React Router v6
- Tailwind CSS 3
- Vite
- Axios

**Backend:**
- Java 17+
- Spring Boot 3.1.5
- Spring Security with JWT
- Spring Data JPA
- H2 Database (dev) / MySQL (prod)
- Maven

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Java 17** - [Download](https://adoptium.net/)
- **Maven** - [Download](https://maven.apache.org/download.cgi)

### Check Installations

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check Java version
java -version

# Check Maven version
mvn --version
```

## Installation

### 1. Clone the Repository

```bash
git clone git@github.com:klenq/Personal_Portfolio.git
cd Personal_Portfolio
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 3. Install Backend Dependencies

```bash
cd ../backend
mvn clean install
```

## Running the Application

### Option 1: Run Both Frontend and Backend

#### Terminal 1 - Start Backend Server

```bash
cd backend
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

#### Terminal 2 - Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:3000`

### Option 2: Using JAR File (Production)

#### Build the Backend

```bash
cd backend
mvn clean package
java -jar target/portfolio-backend.jar
```

#### Build the Frontend

```bash
cd frontend
npm run build
npm run preview
```

## Accessing the Application

- **Main Portfolio**: `http://localhost:3000`
- **Project Archive**: `http://localhost:3000/projects-archive`
- **Admin Login**: `http://localhost:3000/login`
- **Admin Panel**: `http://localhost:3000/admin`
- **Backend API**: `http://localhost:8080/api`
- **H2 Console** (dev): `http://localhost:8080/h2-console`

### Default Admin Credentials

```
Username: admin
Password: admin123
```

**⚠️ Important:** Change these credentials in production!

## Configuration

### Frontend Configuration

Edit `frontend/src/services/api.js` to change the API base URL:

```javascript
const API_BASE_URL = 'http://localhost:8080/api';
```

### Backend Configuration

Edit `backend/src/main/resources/application.properties`:

```properties
# Server Port
server.port=8080

# Database (H2 for development)
spring.datasource.url=jdbc:h2:mem:portfoliodb
spring.datasource.username=sa
spring.datasource.password=

# For MySQL (production)
# spring.datasource.url=jdbc:mysql://localhost:3306/portfolio
# spring.datasource.username=your_username
# spring.datasource.password=your_password
```

## Production Deployment

This project uses a **local build, remote deploy** strategy for production.

### First-Time Server Setup

**On the server:**
```bash
# Copy and run setup script
scp server-setup.sh root@YOUR_SERVER_IP:/root/
ssh root@YOUR_SERVER_IP
chmod +x server-setup.sh
./server-setup.sh
```

This will:
- Install Java 17, MySQL, Nginx
- Create database and user
- Configure systemd service
- Setup Nginx reverse proxy

### Deploy to Production

**On your local machine:**
```bash
# Build locally and deploy to server
chmod +x local-deploy.sh
./local-deploy.sh
```

This script:
- Builds backend with Maven
- Builds frontend with Vite
- Uploads to server
- Restarts services
- Cleans up temporary files

### Start Backend Service (First Deployment)

**On the server:**
```bash
sudo systemctl start portfolio-backend
sudo systemctl status portfolio-backend
```

### Subsequent Deployments

Just run this on your local machine:
```bash
./local-deploy.sh
```

For complete deployment instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

## Features Guide

### Admin Panel

1. Navigate to `http://localhost:3000/login`
2. Login with default credentials
3. Update your personal information:
   - Name, title, bio
   - Email, phone
   - Social media links (LinkedIn, GitHub)
   - Resume URL
4. Manage projects:
   - Add/edit/delete projects
   - Mark projects as "featured" to show on home page
   - Add technologies, descriptions, and links

### Portfolio Sections

- **About**: Personal bio and introduction
- **Experience**: Work history and roles
- **Projects**: Featured projects with links
- **Contact**: Email and social media links

### Project Archive

- View all projects in a table format (desktop)
- Card view for mobile devices
- Filter by featured status
- Direct links to code and demos

## API Endpoints

### Public Endpoints

```
GET  /api/public/personal-info       # Get personal information
GET  /api/public/projects            # Get all projects
GET  /api/public/projects/featured   # Get featured projects only
GET  /api/public/projects/{id}       # Get project by ID
```

### Admin Endpoints (Requires Authentication)

```
POST /api/auth/login                 # Login and get JWT token
POST /api/admin/personal-info        # Update personal information
POST /api/admin/projects             # Create new project
PUT  /api/admin/projects/{id}        # Update project
DELETE /api/admin/projects/{id}      # Delete project
```

## Troubleshooting

### Frontend Issues

**Problem**: Page shows black screen
- **Solution**: Ensure backend is running. The frontend has fallback data, but check browser console for errors.

**Problem**: Styles not loading
- **Solution**: Run `npm install` again and restart the dev server.

### Backend Issues

**Problem**: `mvn: command not found`
- **Solution**: Install Maven or use the Maven wrapper: `./mvnw spring-boot:run`

**Problem**: Port 8080 already in use
- **Solution**: Stop the process using port 8080 or change the port in `application.properties`

### Database Issues

**Problem**: H2 console not accessible
- **Solution**: Ensure `spring.h2.console.enabled=true` in `application.properties`

## Environment Variables

### Frontend (.env)

Create `.env` file in `frontend/`:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

### Backend

Set via environment variables or `application.properties`:

```properties
JWT_SECRET=your-secret-key-here
JWT_EXPIRATION=86400000
```

## Contributing

All contributions are welcome


## Support

For issues and questions:
- Create an issue on GitHub

## Acknowledgments

- Design inspired by Swiss modernism
- Built with Passion using React and Spring Boot
- Icons from Heroicons and React Icons

---

**Built with geometric precision** ⬛ Made with React, Spring Boot & Tailwind CSS
