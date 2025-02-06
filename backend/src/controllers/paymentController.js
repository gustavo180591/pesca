import prisma from '../config/db.js';

export const processPayment = async (req, res) => {
    const { pedido_id, metodo, monto } = req.body;

    const pago = await prisma.pago.create({
        data: { pedido_id, metodo, monto, estado: "completado" }
    });

    res.json(pago);
};
