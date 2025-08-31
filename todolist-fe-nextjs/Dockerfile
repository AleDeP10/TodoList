# ──────────────────────────────────────────────
# Stage 1 — Build static frontend assets via npm
# ──────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm dedupe

COPY . .
COPY .env.local ./.env.local

RUN npm run build-static

# ──────────────────────────────────────────────
# Stage 2 — Serve frontend via NGINX
# ──────────────────────────────────────────────
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/out .

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD [\"nginx\", \"-g\", \"daemon off;\"]

# ──────────────────────────────────────────────
# Stage 3 — Serve Storybook
# ──────────────────────────────────────────────
FROM node:20-alpine AS storybook

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm dedupe

COPY . .

COPY scripts/buildStorybook.js ./scripts/buildStorybook.js

RUN npm run build-storybook-raw

EXPOSE 6006
CMD ["npm", "run", "storybook"]