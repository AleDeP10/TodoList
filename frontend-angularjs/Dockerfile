# ──────────────────────────────────────────────
# Stage 1 — Build static frontend assets via npm
# ──────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency definitions
COPY package*.json ./

# Install dependencies 
ENV NODE_ENV=development
RUN npm ci

# Copy application source files
COPY . .

# ⬇️ Override environment config
COPY config.json ./config.json

# Run full frontend build (clean, SCSS compilation, static assets)
RUN npm run build

# ──────────────────────────────────────────────
# Stage 2 — Serve frontend via NGINX
# ──────────────────────────────────────────────
FROM nginx:alpine

# Environment configuration (injected at build time)
# Use ARG to select config variant, default is "docker"
ARG ENV
ENV ENV=prod

# Copy compiled frontend assets
COPY --from=builder /app/dist/ /usr/share/nginx/html

# Inject custom NGINX config (SPA routing, port binding)
COPY nginx.${ENV}.conf /etc/nginx/conf.d/default.conf

# Expose internal container port served by NGINX
EXPOSE 8080