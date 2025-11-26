import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function inspectDatabase() {
  console.log('🔍 Inspeccionando estructura de la base de datos...\n');

  try {
    // Ver estructura de tabla alumno
    console.log('📋 Tabla ALUMNO:');
    console.log('================');
    const alumnos = await prisma.alumno.findMany({ take: 2 });
    if (alumnos.length > 0) {
      console.log('Columnas:', Object.keys(alumnos[0]));
      console.log('\nEjemplo de registros:');
      alumnos.forEach((a, i) => {
        console.log(`\n${i + 1}.`, JSON.stringify(a, null, 2));
      });
    } else {
      console.log('No hay registros en la tabla alumno');
    }

    console.log('\n\n📋 Tabla PROFESOR:');
    console.log('==================');
    const profesores = await prisma.profesor.findMany({ take: 2 });
    if (profesores.length > 0) {
      console.log('Columnas:', Object.keys(profesores[0]));
      console.log('\nEjemplo de registros:');
      profesores.forEach((p, i) => {
        console.log(`\n${i + 1}.`, JSON.stringify(p, null, 2));
      });
    } else {
      console.log('No hay registros en la tabla profesor');
    }

    console.log('\n\n📋 Tabla USUARIO:');
    console.log('=================');
    const usuarios = await prisma.usuario.findMany({ take: 5 });
    if (usuarios.length > 0) {
      console.log('Columnas:', Object.keys(usuarios[0]));
      console.log('\nRegistros:');
      usuarios.forEach((u, i) => {
        console.log(`\n${i + 1}. ID: ${u.id}, Email: ${u.email}, Rol: ${u.rol}`);
        console.log(`   alumno_id: ${u.alumno_id}, profesor_id: ${u.profesor_id}`);
      });
    } else {
      console.log('No hay registros en la tabla usuario');
    }

    // Ver todas las tablas
    console.log('\n\n📊 Conteo de registros por tabla:');
    console.log('==================================');
    const alumnoCount = await prisma.alumno.count();
    const profesorCount = await prisma.profesor.count();
    const usuarioCount = await prisma.usuario.count();
    const cursoCount = await prisma.curso.count();
    const matriculaCount = await prisma.matricula.count();
    
    console.log(`Alumnos: ${alumnoCount}`);
    console.log(`Profesores: ${profesorCount}`);
    console.log(`Usuarios: ${usuarioCount}`);
    console.log(`Cursos: ${cursoCount}`);
    console.log(`Matrículas: ${matriculaCount}`);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

inspectDatabase();
