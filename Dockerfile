# Etapa 1: Build
FROM node:22-slim AS builder

WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma migrate deploy
RUN npx prisma generate
RUN npm run build
RUN npm prune --omit=dev

# Etapa 2: Produção
FROM node:22-slim

RUN apt-get update -y && apt-get install -y openssl

RUN addgroup --system appgroup && \
    adduser --system --home /home/appuser --ingroup appgroup --disabled-password appuser && \
    mkdir -p /home/appuser && \
    chown -R appuser:appgroup /home/appuser

USER appuser

WORKDIR /app

COPY package*.json ./
COPY prisma prisma
COPY jsons jsons

RUN npm install --omit=dev
RUN npx prisma generate

COPY --from=builder /app/dist ./dist

CMD ["node", "dist/main/server.js"]
