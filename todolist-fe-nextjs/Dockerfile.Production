# ──────────────────────────────────────────────
# Stage 1 — Build Next.js app
# ──────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy workspace-specific package.json and lockfile
COPY ./package.json ./package.json
COPY shared-resources/yarn.lock ./yarn.lock

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy source files and shared resources
COPY . .
COPY shared-resources ./shared-resources

# Replace next.config.cjs with next.config.Production.cjs
COPY ./next.config.Production.cjs ./next.config.cjs

# Copy environment config
COPY .env.production .env.local

# Build the Next.js app
RUN yarn build

# Build the Next.js app
RUN yarn build && yarn export

# ──────────────────────────────────────────────
# Stage 2 — Serve static files
# ──────────────────────────────────────────────
FROM node:20-alpine

WORKDIR /app

# Install static file server
RUN yarn global add serve

# Copy exported static files
COPY --from=builder /app/out ./out

# Expose frontend port
EXPOSE 3000

# Serve static files
CMD serve -s out -l 3000
