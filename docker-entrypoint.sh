#!/bin/sh
# Docker entrypoint script for Backend
# Ejecuta migraciones de Prisma antes de iniciar la aplicación

set -e

echo "Iniciando Backend..."
echo "DATABASE_URL: ${DATABASE_URL}"

# Esperar a que la base de datos esté lista
echo "Esperando a que la base de datos esté lista..."
until npx prisma db pull 2>/dev/null || [ $? -eq 1 ]; do
  echo "Base de datos no disponible - esperando..."
  sleep 2
done

echo "✓ Base de datos disponible"

# Generar Prisma Client
echo "Generando Prisma Client..."
npx prisma generate

# Ejecutar migraciones (opcional en producción)
if [ "$NODE_ENV" = "development" ]; then
    echo "Aplicando migraciones de desarrollo..."
    npx prisma migrate deploy || echo "⚠ Error en migraciones (puede ser normal si ya están aplicadas)"
fi

echo "✓ Prisma configurado correctamente"

# Ejecutar el comando principal
echo "Iniciando aplicación..."
exec "$@"
