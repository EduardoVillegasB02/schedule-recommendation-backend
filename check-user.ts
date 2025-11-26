import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkUsers() {
  // Verificar usuarios existentes
  const users = await prisma.usuario.findMany({
    include: {
      alumno: true,
      profesor: true,
    },
  });
  
  console.log('=== USUARIOS EXISTENTES ===\n');
  users.forEach(user => {
    console.log(`Email: ${user.email}`);
    console.log(`Rol: ${user.rol}`);
    console.log(`Password (Base64): ${user.password}`);
    if (user.alumno) {
      console.log(`Alumno: ${user.alumno.codigo} - ${user.alumno.nombres} ${user.alumno.apellidos}`);
    }
    if (user.profesor) {
      console.log(`Profesor: ${user.profesor.codigo_profesor} - ${user.profesor.nombre}`);
    }
    console.log('---\n');
  });
  
  await prisma.$disconnect();
}

checkUsers();
