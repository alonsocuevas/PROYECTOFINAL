import { eventHandler, readBody } from 'h3';

export default eventHandler(async (event) => {
  const body = await readBody(event);
  
  // Aquí deberías agregar la lógica para guardar el usuario en la base de datos.
  // Por ejemplo, usando Prisma:
  // const user = await prisma.user.create({ data: body });

  // Simulación de respuesta exitosa
  return { message: 'Usuario creado exitosamente', user: body };
});