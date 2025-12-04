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

# Crear usuario no-root primero
RUN groupadd -g 1001 nodejs && \
    useradd -r -u 1001 -g nodejs nestjs

# Copiar dependencias de producción con ownership correcto
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nestjs:nodejs /app/package*.json ./

# Crear directorio de logs con ownership correcto
RUN mkdir -p /app/logs && chown nestjs:nodejs /app/logs

# Script de inicio (antes de cambiar a usuario no-root)
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

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
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["node", "dist/src/main.js"]
