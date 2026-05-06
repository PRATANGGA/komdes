# =====================
# Builder
# =====================
FROM node:20-alpine AS builder

WORKDIR /app

RUN corepack enable

COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages ./packages
COPY docs ./docs

RUN pnpm install --frozen-lockfile
RUN pnpm build:komdes
RUN pnpm build:docs


# =====================
# Runner
# =====================
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/docs/dist ./dist

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "dist", "-l", "3000"]