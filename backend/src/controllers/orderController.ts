import { Request, Response } from 'express';
import { prisma } from '../config/db';

// Obtener todos los pedidos
export const getAllOrders = async (req: Request, res: Response) => {
    try {
        const pedidos = await prisma.pedido.findMany({
            include: { usuario: true, detalles: true }
        });
        res.json(pedidos);
    } catch (error) {
        console.error('Error obteniendo pedidos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Obtener un pedido por ID
export const getOrderById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const pedido = await prisma.pedido.findUnique({
            where: { id: Number(id) },
            include: { usuario: true, detalles: true }
        });
        if (!pedido) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }
        res.json(pedido);
    } catch (error) {
        console.error('Error obteniendo pedido:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Crear un nuevo pedido
export const createOrder = async (req: Request, res: Response) => {
    try {
        const { usuarioId, detalles } = req.body;
        const nuevoPedido = await prisma.pedido.create({
            data: {
                usuarioId,
                detalles: { create: detalles }
            },
            include: { detalles: true }
        });
        res.status(201).json(nuevoPedido);
    } catch (error) {
        console.error('Error creando pedido:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Actualizar un pedido
export const updateOrder = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        const pedidoActualizado = await prisma.pedido.update({
            where: { id: Number(id) },
            data: { estado }
        });
        res.json(pedidoActualizado);
    } catch (error) {
        console.error('Error actualizando pedido:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Eliminar un pedido
export const deleteOrder = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.pedido.delete({ where: { id: Number(id) } });
        res.json({ message: 'Pedido eliminado correctamente' });
    } catch (error) {
        console.error('Error eliminando pedido:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
