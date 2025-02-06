import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs'; 
import * as jwt from 'jsonwebtoken'; 
import { prisma } from '../config/db';
import env from '../config/env';

// Registro de usuario
export const register = async (req: Request, res: Response) => {
    try {
        const { nombre, email, password } = req.body;
        
        // Verificar si el usuario ya existe
        const existingUser = await prisma.usuario.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya está registrado' });
        }
        
        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Crear usuario
        const user = await prisma.usuario.create({
            data: { nombre, email, password: hashedPassword }
        });
        
        res.status(201).json({ message: 'Usuario registrado exitosamente', user });
    } catch (error) {
        console.error('Error en registro:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

// Inicio de sesión
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        
        // Buscar usuario
        const user = await prisma.usuario.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Credenciales incorrectas' });
        }
        
        // Comparar contraseñas
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciales incorrectas' });
        }
        
        // Generar token JWT
        const token = jwt.sign({ userId: user.id, email: user.email }, env.jwtSecret, { expiresIn: '7d' });
        
        res.json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        console.error('Error en inicio de sesión:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
