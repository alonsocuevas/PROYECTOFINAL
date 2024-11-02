import { hash } from 'bcryptjs';
import { prisma } from '../../../prisma/schema.prisma'; // Ajusta la importación según tu estructura

export async function registerUser(data: {
    rut: string;
    nombres: string;
    apellidos: string;
    correo: string;
    clave: string;
    area: string;
    cargo: string;
    tipHorario: string;
    empresa: string;
    pin: string;
}) {
    const { rut, nombres, apellidos, correo, clave, area, cargo, tipHorario, empresa, pin } = data;

    // Hashear la clave y el pin
    const hashedClave = await hash(clave, 10);
    const hashedPin = await hash(pin, 10);

    // Crear el nuevo usuario en la base de datos
    const user = await prisma.user.create({
        data: {
            rut,
            nombres,
            apellidos,
            correo,
            clave: hashedClave,
            area,
            cargo,
            tipHorario,
            empresa,
            pin: hashedPin,
        },
    });

    return user;
}
