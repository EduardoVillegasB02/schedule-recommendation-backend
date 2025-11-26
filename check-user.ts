import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkUser() {
  const user = await prisma.usuario.findUnique({
    where: { email: 'gabriel.ferre.c@uni.edu.pe' },
    include: { alumno: true }
  });
  
  console.log('Usuario encontrado:');
  console.log(JSON.stringify(user, null, 2));
  
  if (user) {
    console.log('\nPassword en BD (Base64):', user.password);
    const expectedHash = Buffer.from('alumno123').toString('base64');
    console.log('Password esperado (Base64):', expectedHash);
    console.log('¿Coinciden?', user.password === expectedHash);
  }
  
  await prisma.$disconnect();
}

checkUser();
