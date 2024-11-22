export async function fetchUsers(){
  try {
    const data = await (await fetch('http://localhost:3000/api/users', {
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
    const data = await (await fetch('http://localhost:3000/api/attendances', {
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
    const response = await fetch(`http://localhost:3000/api/users/${rut}`, {
      method: "DELETE",
    });

    return response;
  }

  catch (err) {
    console.log('Error de base de datos:', err);
    throw new Error('Falló al eliminar el usuario');
  }

}