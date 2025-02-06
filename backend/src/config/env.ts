import * as dotenv from 'dotenv';
import * as path from 'path';

// Cargar variables de entorno desde el archivo .env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Validar que todas las variables necesarias estén definidas
const requiredEnvVars = [
    'DATABASE_URL',
    'JWT_SECRET',
    'PORT',
    'SMTP_HOST',
    'SMTP_PORT',
    'SMTP_USER',
    'SMTP_PASS',
    'STRIPE_SECRET_KEY' // 🔥 Agregamos Stripe aquí
];

for (const varName of requiredEnvVars) {
    if (!process.env[varName]) {
        console.error(`❌ FALTA VARIABLE DE ENTORNO: ${varName}`);
        process.exit(1);
    }
}

export default {
    port: process.env.PORT || 5000,
    databaseUrl: process.env.DATABASE_URL!,
    jwtSecret: process.env.JWT_SECRET!,
    smtp: {
        host: process.env.SMTP_HOST!,
        port: Number(process.env.SMTP_PORT!),
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!
    },
    stripeSecretKey: process.env.STRIPE_SECRET_KEY! // ✅ Agregamos Stripe
};
