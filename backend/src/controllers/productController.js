import prisma from '../config/db.js';

export const getAllProducts = async (req, res) => {
    const productos = await prisma.producto.findMany();
    res.json(productos);
};

export const getProductById = async (req, res) => {
    const { id } = req.params;
    const producto = await prisma.producto.findUnique({ where: { id: parseInt(id) } });
    
    if (!producto) return res.status(404).json({ msg: 'Producto no encontrado' });
    
    res.json(producto);
};
