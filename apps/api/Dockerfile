# Stage 1: Build stage
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Turborepo optimization
RUN npx turbo prune --docker

# Build the application
RUN bun build src/index.ts --outdir dist --target bun

# Stage 2: Production stage
FROM node:20-alpine AS production

# Set working directory
WORKDIR /app

# Copy built application
COPY --from=builder /app/dist ./dist

# Copy package.json for dependencies
COPY package.json ./

# Install production dependencies
RUN npm ci --only=production

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3001/ || exit 1

# Start the application
CMD ["bun", "run", "dist/index.js"]

# Stage 3: Development stage
FROM node:20-alpine AS development

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Turborepo optimization
RUN npx turbo prune --docker

# Expose port
EXPOSE 3001

# Start development server
CMD ["bun", "run", "--watch", "src/index.ts"]