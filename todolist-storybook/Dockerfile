# ───────────────────────────────────────────────────
# Dockerfile — Build and Serve Storybook in one stage
# ───────────────────────────────────────────────────

FROM node:20-alpine

WORKDIR /app

# Enforce Yarn v1.22.19 via shim
COPY shared-resources/scripts/shims/yarn-1.22.19.cjs ./yarn.cjs
RUN echo 'yarn-path "./yarn.cjs"' > .yarnrc

# Install dependencies
COPY package.json ./package.json
COPY shared-resources/yarn.lock ./yarn.lock
RUN yarn install --frozen-lockfile

# Copy source and shared resources
COPY . .
COPY shared-resources ./shared-resources

# Build Storybook static output
RUN yarn run build-storybook

# Copy custom server
COPY server.cjs ./

# Expose Storybook port
EXPOSE 6006

# Set environment for production mode
ENV STORYBOOK_ENV=production

# Start Storybook server
CMD ["node", "server.cjs"]
