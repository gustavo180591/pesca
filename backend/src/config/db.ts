import { PrismaClient } from '@prisma/client';

// Inicializar Prisma Client
const prisma = new PrismaClient();

// Manejo de conexión y cierre adecuado de Prisma
async function connectDB() {
    try {
        await prisma.$connect();
        console.log('✅ Base de datos conectada correctamente');
    } catch (error) {
        console.error('❌ Error al conectar con la base de datos:', error);
        process.exit(1);
    }
}

export { prisma, connectDB };