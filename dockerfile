# Dockerfile - Backend NestJS
# Sistema de Recomendación y Generación de Horarios - UNI

FROM node:20-slim AS builder

WORKDIR /app

# Instalar dependencias del sistema necesarias para Prisma
RUN apt-get update && \
    apt-get install -y openssl ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# Copiar archivos de dependencias
COPY package*.json ./
COPY yarn.lock ./
COPY prisma ./prisma/

# Instalar dependencias con yarn
RUN yarn install --frozen-lockfile && \
    yarn cache clean

# Copiar código fuente
COPY . .

# Generar Prisma Client
RUN npx prisma generate

# Compilar aplicación
RUN yarn build

# ==========================
# Stage de producción
# ==========================
FROM node:20-slim AS production

WORKDIR /app

# Instalar dependencias del sistema
RUN apt-get update && \
    apt-get install -y curl openssl ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# Copiar dependencias de producción desde builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package*.json ./

# Crear usuario no-root
RUN groupadd -g 1001 nodejs && \
    useradd -r -u 1001 -g nodejs nestjs && \
    mkdir -p /app/logs && \
    chown -R nestjs:nodejs /app

USER nestjs

# Exponer puerto
EXPOSE 3003

# Variables de entorno por defecto
ENV NODE_ENV=production \
    PORT=3003

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD curl -f http://localhost:3003/api || exit 1

# Comando de inicio
CMD ["node", "dist/main.js"]
