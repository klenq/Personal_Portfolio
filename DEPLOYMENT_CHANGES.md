# Deployment System Changes

## Summary

The deployment system has been completely redesigned to use a **local build, remote deploy** strategy instead of building on the server.

## Why This Change?

**Problem:** Building on small servers (512MB RAM, 1 CPU) causes:
- Out of memory errors
- Slow build times
- Frozen processes
- Failed deployments

**Solution:** Build on your local machine (with more resources) and upload compiled files to the server.

## What Changed

### New Files

1. **`local-deploy.sh`** - Run on LOCAL machine
   - Builds backend with Maven
   - Builds frontend with Vite
   - Uploads to server via SCP
   - Restarts services
   - Cleans up temp files

2. **`server-setup.sh`** - Run on SERVER (one-time setup)
   - Installs dependencies (Java, MySQL, Nginx)
   - Creates database
   - Configures systemd service
   - Sets up Nginx reverse proxy
   - Configures firewall

3. **`DEPLOYMENT_GUIDE.md`** - Complete deployment documentation
   - Step-by-step first-time setup
   - Troubleshooting guide
   - Security best practices
   - Common workflows

### Deleted Files

- ~~`deploy.sh`~~ - Old server-side build script
- ~~`setup-database.sh`~~ - Merged into server-setup.sh
- ~~`setup-nginx.sh`~~ - Merged into server-setup.sh
- ~~`setup-service.sh`~~ - Merged into server-setup.sh

### Updated Files

- **`README.md`** - Added production deployment section
- **`.gitignore`** - Added build artifacts exclusions

## New Workflow

### First-Time Deployment

```bash
# 1. On server
scp server-setup.sh root@YOUR_SERVER_IP:/root/
ssh root@YOUR_SERVER_IP
chmod +x server-setup.sh
./server-setup.sh

# 2. On local machine
chmod +x local-deploy.sh
./local-deploy.sh

# 3. On server
ssh root@YOUR_SERVER_IP
sudo systemctl start portfolio-backend
```

### Subsequent Deployments

```bash
# On local machine only
./local-deploy.sh
```

## Benefits

1. **Faster Deployments** - Build with full local resources
2. **More Reliable** - No OOM errors on small servers
3. **Better Development** - Test builds locally before deploying
4. **Cleaner Separation** - One script per environment
5. **Auto Cleanup** - Removes build artifacts automatically

## Migration from Old System

If you were using the old `deploy.sh`:

1. **On your server**, ensure `/var/www/portfolio` exists with proper structure
2. **Run the new `server-setup.sh`** to configure the server properly
3. **Use `local-deploy.sh`** instead of `deploy.sh` from now on

The server directory structure remains the same:
```
/var/www/portfolio/
├── backend/
│   ├── portfolio-backend.jar
│   └── .env
└── frontend/
    ├── index.html
    └── assets/
```

## Troubleshooting

### "Permission denied" when running scripts

```bash
chmod +x local-deploy.sh
chmod +x server-setup.sh
```

### "SCP connection refused"

Ensure SSH is properly configured:
```bash
ssh root@YOUR_SERVER_IP "echo 'Connection test'"
```

### Build fails locally

Check you have:
- Java 17+: `java -version`
- Maven: `mvn -version`
- Node.js: `node -v`
- npm: `npm -v`

## Questions?

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for complete documentation.

---

**Date:** 2025-01-19
**Version:** 2.0
