import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const alumnos = await prisma.alumno.findMany({
    take: 5,
    select: {
      codigo: true,
      nombres: true,
      apellidos: true,
    },
  });
  
  console.log('Códigos de alumnos en la BD:');
  console.log(alumnos);
  
  await prisma.$disconnect();
}

main();
