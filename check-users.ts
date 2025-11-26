import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkUsers() {
  try {
    const usuarios = await prisma.usuario.findMany({
      select: {
        id: true,
        email: true,
        rol: true,
      },
    });

    console.log('\n📋 Usuarios en la base de datos:');
    console.log('================================');
    
    if (usuarios.length === 0) {
      console.log('❌ No hay usuarios en la base de datos');
    } else {
      usuarios.forEach((user, index) => {
        console.log(`\n${index + 1}. Email: ${user.email}`);
        console.log(`   Rol: ${user.rol}`);
        console.log(`   ID: ${user.id}`);
      });
    }
    
    console.log(`\n✅ Total de usuarios: ${usuarios.length}\n`);
  } catch (error) {
    console.error('❌ Error al consultar usuarios:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUsers();
