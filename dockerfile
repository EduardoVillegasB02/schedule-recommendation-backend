# Etapa 1: Build
FROM node:20 as builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: Producction
FROM node:20
WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist ./dist

ARG PORT
EXPOSE ${PORT}
CMD ["node", "dist/main.js"]
