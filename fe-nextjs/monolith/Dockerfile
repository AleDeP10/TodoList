# ──────────────────────────────────────────────
# Stage 1 — Build Next.js app
# ──────────────────────────────────────────────

# Lightweight Node.js base image for build stage
FROM node:20-alpine AS builder  

# Set working directory inside the container
WORKDIR /app  

# Copy project manifest
COPY ./package.json ./package.json  

# Use shared lockfile for consistent installs
COPY shared-resources/yarn.lock ./yarn.lock  

# Install dependencies without modifying lockfile
RUN yarn install --frozen-lockfile  

# Copy full project into container
COPY . .  

# Include shared code/assets
COPY shared-resources ./shared-resources  

# Use production config
COPY ./next.config.cjs ./next.config.cjs  

# Set production environment variables
COPY .env.production .env.local  

# Compile the Next.js app
RUN yarn build  

# ──────────────────────────────────────────────
# Stage 2 — Run Next.js app
# ──────────────────────────────────────────────

# Clean runtime image
FROM node:20-alpine  

# Set working directory
WORKDIR /app  

# Copy everything from build stage
COPY --from=builder /app /app  

# Open port 3000 for incoming traffic
EXPOSE 3000  

# Start Next.js server in production mode
CMD yarn start  
