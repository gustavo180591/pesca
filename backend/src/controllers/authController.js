import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/db.js';
import { JWT_SECRET } from '../config/env.js';

export const register = async (req, res) => {
    const { nombre, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const usuario = await prisma.usuario.create({
        data: { nombre, email, password: hashedPassword },
    });

    const token = jwt.sign({ id: usuario.id }, JWT_SECRET, { expiresIn: '1d' });

    res.json({ token });
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    const usuario = await prisma.usuario.findUnique({ where: { email } });

    if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
        return res.status(401).json({ msg: 'Credenciales incorrectas' });
    }

    const token = jwt.sign({ id: usuario.id }, JWT_SECRET, { expiresIn: '1d' });

    res.json({ token });
};
