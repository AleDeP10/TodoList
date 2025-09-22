# ──────────────────────────────────────────────
# Stage 1 — Build Storybook static assets
# ──────────────────────────────────────────────
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy workspace-specific package manifest and lockfile
COPY ./package.json ./package.json
COPY shared-resources/yarn.lock ./yarn.lock

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source files and shared resources
COPY . .
COPY shared-resources ./shared-resources

# Build Storybook static output
RUN yarn run build-storybook


# ──────────────────────────────────────────────
# Stage 2 — Serve Storybook with custom server
# ──────────────────────────────────────────────
FROM node:20-alpine AS storybook

# Set working directory
WORKDIR /app

# Copy built static files from builder stage
COPY --from=builder /app/storybook-static ./storybook-static

# Copy package manifest and lockfile for runtime dependencies
COPY package*.json ./shared-resources/yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy custom server script
COPY server.js ./

# Expose Storybook port
EXPOSE 6006

# Start Storybook using custom Node server
CMD ["node", "server.js"]