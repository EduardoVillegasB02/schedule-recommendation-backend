# Dockerfile - Backend NestJS
# Sistema de Recomendación y Generación de Horarios - UNI

FROM node:20-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
COPY yarn.lock ./
COPY prisma ./prisma/

# Instalar dependencias con yarn
RUN yarn install --frozen-lockfile --legacy-peer-deps && \
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
FROM node:20-alpine AS production

WORKDIR /app

# Instalar curl para healthcheck
RUN apk add --no-cache curl

# Copiar dependencias de producción desde builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package*.json ./

# Crear usuario no-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001 && \
    mkdir -p /app/logs && \
    chown -R nestjs:nodejs /app

USER nestjs

# Exponer puerto
EXPOSE 4000

# Variables de entorno por defecto
ENV NODE_ENV=production \
    PORT=4000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD curl -f http://localhost:4000 || exit 1

# Comando de inicio
CMD ["node", "dist/main.js"]
