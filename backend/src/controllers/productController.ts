import { Request, Response } from 'express';
import { prisma } from '../config/db';

// Obtener todos los productos
export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const productos = await prisma.producto.findMany();
        res.json(productos);
    } catch (error) {
        console.error('Error obteniendo productos:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Obtener un producto por ID
export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const producto = await prisma.producto.findUnique({ where: { id: Number(id) } });
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(producto);
    } catch (error) {
        console.error('Error obteniendo producto:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Crear un nuevo producto
export const createProduct = async (req: Request, res: Response) => {
    try {
        const { nombre, descripcion, precio, stock } = req.body;
        const nuevoProducto = await prisma.producto.create({
            data: { nombre, descripcion, precio, stock }
        });
        res.status(201).json(nuevoProducto);
    } catch (error) {
        console.error('Error creando producto:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Actualizar un producto
export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, precio, stock } = req.body;
        const productoActualizado = await prisma.producto.update({
            where: { id: Number(id) },
            data: { nombre, descripcion, precio, stock }
        });
        res.json(productoActualizado);
    } catch (error) {
        console.error('Error actualizando producto:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Eliminar un producto
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.producto.delete({ where: { id: Number(id) } });
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        console.error('Error eliminando producto:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};