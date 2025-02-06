import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';

// Función para generar un JWT
export const generateToken = (userId) => {
    return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1d' });
};

// Función para verificar un JWT
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
};
