import config from "./config";
import { User } from "./definitions";

export async function fetchUsers(){
  try {
    const data = await (await fetch(`${config.NITRO_URL}api/users`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }

    })).json();

    return data;
  }

  catch (err) {
    console.log('Error de base de datos:', err);
    throw new Error('Falló al obtener los datos');
  }

}

export async function fetchAttendances(){
  try {
    const data = await (await fetch(`${config.NITRO_URL}api/attendances`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }

    })).json();

    return data;
  }

  catch (err) {
    console.log('Error de base de datos:', err);
    throw new Error('Falló al obtener los datos');
  }

}

export async function deleteUser(rut: string){
  try {
    const response = await fetch(`${config.NITRO_URL}api/users/${rut}`, {
      method: "DELETE",
    });

    return response;
  }

  catch (err) {
    console.log('Error de base de datos:', err);
    throw new Error('Falló al eliminar el usuario');
  }

}

export async function updateUser(user: User){
  try {
    const { qrCode, ...userThen } = user;
    const response = await fetch(`${config.NITRO_URL}api/users`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...userThen,
        turno: userThen.turno.toLowerCase(),
      }),
    });

    return response;
  }

  catch (err) {
    console.log('Error de base de datos:', err);
    throw new Error('Falló al actualizar el usuario');
  }
}