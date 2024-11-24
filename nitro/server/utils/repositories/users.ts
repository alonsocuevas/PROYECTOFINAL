import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { FormCreateUser } from "./schemes/User";

export async function listUsers(){
	return client.usuario.findMany();
}

export async function createUser(user: FormCreateUser){

  try {
    await client.usuario.create({
      data: user,
    });
  }

  catch(error){
    if(error instanceof PrismaClientKnownRequestError){
      if(error.code === 'P2002'){
        return false;
      }
    }

    throw error;
  }

  return true;
}

export async function deleteUser(rut: string | undefined){
  try {
    await client.usuario.delete({
      where: {
        rut: rut
      }
    });
  }

  catch(error){
    if(error instanceof PrismaClientKnownRequestError){
      if(error.code === 'P2025'){
        return false;
      }
    }

    throw error;
  }

  return true;
}

export async function updateUser(rut: string | undefined, newUser: FormCreateUser){
  try {
    await client.usuario.update({
      data: newUser,
      where: {
        rut: rut
      }
    });
  }

  catch(error){
    if(error instanceof PrismaClientKnownRequestError){
      if(error.code === 'P2025'){
        return false;
      }
    }

    throw error;
  }

  return true;
}

export async function findUserByEmail(email: string){
  try {
    return await client.usuario.findUniqueOrThrow({
      where: {
        correo: email,
      }
    });
  }

  catch(error){
    if(error instanceof PrismaClientKnownRequestError){
      if(error.code === 'P2025'){
        return false;
      }
    }

    throw error;
  }
}

export async function findUserByRUT(rut: string | undefined){
  try {
    return await client.usuario.findUniqueOrThrow({
      where: {
        rut: rut,
      }
    });
  }

  catch(error){
    if(error instanceof PrismaClientKnownRequestError){
      if(error.code === 'P2025'){
        return false;
      }
    }

    throw error;
  }
}