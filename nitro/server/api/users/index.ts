import { NextApiRequest, NextApiResponse } from 'next';
import { registerUser } from './register';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const userData = req.body;
        try {
            const newUser = await registerUser(userData);
            res.status(201).json(newUser);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al registrar el usuario' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Método ${req.method} no permitido`);
    }
}
