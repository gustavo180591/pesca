import prisma from '../config/db.js';

export const createOrder = async (req, res) => {
    const { usuario_id, productos } = req.body;

    const order = await prisma.pedido.create({
        data: {
            usuario_id,
            total: productos.reduce((acc, item) => acc + item.precio * item.cantidad, 0),
            estado: "pendiente",
            detalles: {
                create: productos.map(p => ({
                    producto_id: p.id,
                    cantidad: p.cantidad,
                    subtotal: p.precio * p.cantidad
                }))
            }
        }
    });

    res.json(order);
};
