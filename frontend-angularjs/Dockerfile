# ──────────────────────────────────────────────
# Stage 1 — Build static frontend assets via npm
# ──────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency definitions
COPY package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev

# Copy application source files
COPY . .

# ⬇️ Override environment config
COPY config.docker.json ./config.json

# Run full frontend build (clean, SCSS compilation, static assets)
RUN npm run build

# ──────────────────────────────────────────────
# Stage 2 — Serve frontend via NGINX
# ──────────────────────────────────────────────
FROM nginx:alpine

# Copy compiled frontend assets
COPY --from=builder /app/dist/ /usr/share/nginx/html

# Inject custom NGINX config (SPA routing, port binding)
COPY nginx.conf /etc/nginx/conf.d/default.conf


# Expose internal container port served by NGINX
EXPOSE 8080