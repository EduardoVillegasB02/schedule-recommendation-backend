import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Función simple para hashear contraseñas (para pruebas - en producción usar bcrypt)
function simpleHash(password: string): string {
  return Buffer.from(password).toString('base64');
}

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...\n');

  try {
    // 1. Crear usuario ADMIN
    console.log('1️⃣  Creando usuario ADMIN...');
    const adminUser = await prisma.usuario.create({
      data: {
        email: 'admin@uni.edu.pe',
        password: simpleHash('admin123'),
        rol: 'ADMIN',
      },
    });
    console.log('✅ Usuario ADMIN creado');
    console.log(`   Email: admin@uni.edu.pe`);
    console.log(`   Password: admin123`);
    console.log(`   ID: ${adminUser.id}\n`);

    // 2. Crear alumno y su usuario
    console.log('2️⃣  Creando alumno...');
    const alumno = await prisma.alumno.create({
      data: {
        codigo: '20200001',
        nombres: 'Juan Carlos',
        apellidos: 'Pérez García',
        ciclo_relativo: 6,
        creditos_aprobados: 120,
        promedio: 15.5,
        estado: 'A',
      },
    });
    
    const alumnoUser = await prisma.usuario.create({
      data: {
        email: 'juan.perez@uni.edu.pe',
        password: simpleHash('alumno123'),
        rol: 'ALUMNO',
        alumno_id: alumno.id,
      },
    });
    console.log('✅ Alumno y usuario creados');
    console.log(`   Código: ${alumno.codigo}`);
    console.log(`   Nombre: ${alumno.nombres} ${alumno.apellidos}`);
    console.log(`   Email: juan.perez@uni.edu.pe`);
    console.log(`   Password: alumno123`);
    console.log(`   ID: ${alumnoUser.id}\n`);

    // 3. Crear profesor y su usuario
    console.log('3️⃣  Creando profesor...');
    const profesor = await prisma.profesor.create({
      data: {
        nombre: 'María González López',
        codigo_profesor: 'P001',
        experiencia_anios: 10,
        popularidad: 0.95,
      },
    });
    
    const profesorUser = await prisma.usuario.create({
      data: {
        email: 'maria.gonzalez@uni.edu.pe',
        password: simpleHash('profesor123'),
        rol: 'PROFESOR',
        profesor_id: profesor.id,
      },
    });
    console.log('✅ Profesor y usuario creados');
    console.log(`   Código: ${profesor.codigo_profesor}`);
    console.log(`   Nombre: ${profesor.nombre}`);
    console.log(`   Email: maria.gonzalez@uni.edu.pe`);
    console.log(`   Password: profesor123`);
    console.log(`   ID: ${profesorUser.id}\n`);

    console.log('🎉 Seed completado exitosamente!');
    console.log('\n📋 Resumen de credenciales:');
    console.log('┌─────────────────────────────────────────────────────┐');
    console.log('│ ADMIN:                                              │');
    console.log('│   Email: admin@uni.edu.pe                           │');
    console.log('│   Password: admin123                                │');
    console.log('├─────────────────────────────────────────────────────┤');
    console.log('│ ALUMNO:                                             │');
    console.log('│   Email: juan.perez@uni.edu.pe                      │');
    console.log('│   Password: alumno123                               │');
    console.log('├─────────────────────────────────────────────────────┤');
    console.log('│ PROFESOR:                                           │');
    console.log('│   Email: maria.gonzalez@uni.edu.pe                  │');
    console.log('│   Password: profesor123                             │');
    console.log('└─────────────────────────────────────────────────────┘');
  } catch (error) {
    console.error('❌ Error durante el seed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();
