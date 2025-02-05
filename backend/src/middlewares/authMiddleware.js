import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';

export const verificarToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ msg: 'Acceso denegado' });

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);
        req.usuario = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'Token inválido' });
    }
};
