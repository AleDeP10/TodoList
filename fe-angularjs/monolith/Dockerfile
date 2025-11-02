# ──────────────────────────────────────────────
# Stage 1 — Build static frontend assets via npm
# ──────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency definitions
COPY package*.json ./

# Install dependencies (isolated build environment)
ENV NODE_ENV=development
RUN npm ci

# Copy application source files
COPY . .

# Inject environment config (used during build)
COPY config.Production.json ./config.json

# Build static assets (clean, SCSS compilation, bundling)
RUN npm run build

# ──────────────────────────────────────────────
# Stage 2 — Serve frontend via NGINX
# ──────────────────────────────────────────────
FROM nginx:alpine

# Copy compiled frontend assets to NGINX public directory
COPY --from=builder /app/dist/ /usr/share/nginx/html

# Ensure config.json is served correctly
COPY config.Docker.json ./config.json

# Inject custom NGINX config (SPA routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose internal container port served by NGINX
EXPOSE 4200
