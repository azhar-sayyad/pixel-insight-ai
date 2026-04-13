# Docker Setup for Turborepo Monorepo

This document provides instructions for using the Docker setup and includes CI/CD suggestions.

## 📋 Quick Start

### Development Environment
```bash
# Start development services
docker-compose up dev-frontend dev-backend

# Or start all development services
docker-compose up --build dev-frontend dev-backend
```

### Production Environment
```bash
# Build and start production services
docker-compose up --build frontend backend

# Or use docker-compose.prod.yml for production
docker-compose -f docker-compose.prod.yml up --build
```

## 🏗️ Docker Architecture

### Multi-stage Builds
- **Frontend**: Node 20 Alpine → Build with Vite → Serve with Nginx
- **Backend**: Node 20 Alpine → Build with Bun → Run with Bun

### Optimization Strategies
- `turbo prune --docker` to reduce unnecessary files
- Multi-stage builds for minimal image size
- Proper dependency caching
- Health checks for all services

## 🚀 Development Workflow

### Local Development
```bash
# Start development containers
docker-compose up dev-frontend dev-backend

# View logs
docker-compose logs -f dev-frontend dev-backend

# Stop development containers
docker-compose down
```

### Production Deployment
```bash
# Build and deploy production
docker-compose up --build -d frontend backend

# View production logs
docker-compose logs -f frontend backend

# Stop production services
docker-compose down
```

## 🔧 Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3001
```

### Backend (.env)
```env
PORT=3001
NODE_ENV=production
```

## 🐳 Docker Commands

### Building Images
```bash
# Build frontend only
docker build -f apps/web/Dockerfile -t pixel-insight-ai/frontend .

# Build backend only
docker build -f apps/api/Dockerfile -t pixel-insight-ai/backend .

# Build all services
docker-compose build
```

### Managing Containers
```bash
# List running containers
docker-compose ps

# View container logs
docker-compose logs -f frontend

# Execute commands in containers
docker-compose exec backend sh

# Remove stopped containers
docker-compose down
```

## 📊 Health Checks

### Backend Health Check
```bash
curl http://localhost:3001/
# Should return: { status: "ok", service: "AI Image Insight API" }
```

### Frontend Health Check
```bash
curl http://localhost/health
# Should return: healthy
```

## 🔄 CI/CD Pipeline (GitHub Actions)

### Example Workflow
```yaml
name: Docker CI/CD

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build and test
        run: |
          docker-compose build
          docker-compose up -d
          sleep 10
          curl -f http://localhost:3001/
          curl -f http://localhost/health
          docker-compose down

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: Deploy to production
        run: |
          # Add your deployment commands here
          echo "Deploying to production..."
```

## 🛠️ Troubleshooting

### Common Issues

1. **Port conflicts**
   ```bash
   # Check running containers
   docker ps
   
   # Stop conflicting containers
   docker stop CONTAINER_ID
   ```

2. **Build failures**
   ```bash
   # Check build logs
   docker-compose build --no-cache
   
   # Check Dockerfile syntax
   docker build -f apps/web/Dockerfile --dry-run .
   ```

3. **Network issues**
   ```bash
   # Check network connectivity
   docker network ls
   docker network inspect app-network
   ```

### Performance Optimization

1. **Build caching**
   ```bash
   # Use build cache
   docker-compose build --cache-from pixel-insight-ai/frontend
   ```

2. **Image cleanup**
   ```bash
   # Remove unused images
   docker image prune -a
   
   # Remove unused containers
   docker container prune
   ```

## 🔒 Security Considerations

1. **Use non-root users** (consider adding USER directives in Dockerfiles)
2. **Scan images** for vulnerabilities
3. **Use secrets** for sensitive data
4. **Keep images updated** with security patches

## 📈 Monitoring

### Container Metrics
```bash
# View resource usage
docker stats

# View container details
docker inspect frontend
```

### Application Metrics
- Implement application-specific health checks
- Add logging for monitoring
- Consider using Prometheus/Grafana for metrics

## 📚 Resources

- [Docker Multi-stage Builds](https://docs.docker.com/build/building/multi-stage/)
- [Turborepo Docker Guide](https://turborepo.dev/docs/guides/tools/docker)
- [Node.js Docker Best Practices](https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md)
- [Nginx Docker Official Image](https://hub.docker.com/_/nginx)

## 📝 Notes

- This setup uses Node 20 Alpine for production containers
- Development environment uses Bun for faster builds
- Health checks are implemented for all services
- Multi-stage builds optimize image size
- Proper networking between services