FROM node:20 AS builder
WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copiar código
COPY . .

# Generar Prisma
RUN npx prisma generate

# Compilar Nest
RUN npm run build

# ==========================
# Stage de producción
# ==========================
FROM node:20 AS production
WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copiar dist y prisma generada
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/prisma ./prisma

# Copiar entrypoint
COPY entrypoint.sh .

EXPOSE ${PORT}

CMD ["./entrypoint.sh"]
