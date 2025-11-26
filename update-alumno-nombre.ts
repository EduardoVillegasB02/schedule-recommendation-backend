import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateAlumno() {
  const updated = await prisma.alumno.update({
    where: { codigo: '20224106A' },
    data: {
      nombres: 'Gabriel',
      apellidos: 'Ferre Contreras',
    },
  });
  
  console.log('Alumno actualizado:');
  console.log(JSON.stringify(updated, null, 2));
  
  await prisma.$disconnect();
}

updateAlumno();
