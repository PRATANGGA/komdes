# =========================
# Base
# =========================
FROM node:22-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app

# =========================
# Dependencies
# =========================
FROM base AS deps

COPY package.json .
COPY pnpm-lock.yaml .
COPY pnpm-workspace.yaml .

COPY docs/package.json ./docs/package.json
COPY packages/package.json ./packages/package.json

RUN pnpm install --frozen-lockfile

# =========================
# Build
# =========================
FROM deps AS builder

COPY . .

# build package
RUN pnpm --filter komdes build

# build docs
RUN pnpm --filter docs build

# =========================
# Runtime
# =========================
FROM node:22-alpine AS runner

ENV NODE_ENV=production

WORKDIR /app

RUN corepack enable

COPY --from=builder /app/docs/.output ./

EXPOSE 3000

CMD ["node", "server/index.mjs"]