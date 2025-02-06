import { Request, Response } from 'express';
import { prisma } from '../config/db';
import Stripe from 'stripe';
import env from '../config/env';

const stripe = new Stripe(env.stripeSecretKey as string, {
    apiVersion: '2023-10-16' as any // ✅ Solución Temporal
});


// Crear un pago
export const createPayment = async (req: Request, res: Response) => {
    try {
        const { amount, currency, paymentMethodId, pedidoId } = req.body;

        // Crear pago en Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            payment_method: paymentMethodId,
            confirm: true
        });

        // Guardar pago en la base de datos
        const pago = await prisma.pago.create({
            data: {
                pedidoId,
                monto: amount,
                estado: 'completado',
                metodo: 'stripe',
                transaccionId: paymentIntent.id
            }
        });

        res.json({ message: 'Pago exitoso', pago });
    } catch (error) {
        console.error('Error procesando pago:', error);
        res.status(500).json({ message: 'Error en el procesamiento del pago' });
    }
};

// Obtener pagos por pedido
export const getPaymentsByOrder = async (req: Request, res: Response) => {
    try {
        const { pedidoId } = req.params;
        const pagos = await prisma.pago.findMany({ where: { pedidoId: Number(pedidoId) } });
        res.json(pagos);
    } catch (error) {
        console.error('Error obteniendo pagos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
