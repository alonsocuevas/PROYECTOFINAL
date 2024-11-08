import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { FormCreateUser } from "./schemes/User";

export async function listUsers(){
	return client.user.findMany();
}

export async function createUser(user: FormCreateUser){
  
  try {
    await client.user.create({
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
    await client.user.delete({
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