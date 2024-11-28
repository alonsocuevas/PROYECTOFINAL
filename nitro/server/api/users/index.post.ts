import { parserUser } from "~/utils/repositories/schemes/User";

export default eventHandler(async (event) => {

  const newUser = await readValidatedBody(event, parserUser);

  if(await findUserByRUT(newUser.rut) || await findUserByEmail(newUser.correo)){
    throw createError({
      status: 418,
      message: "User could not be created",
    });
  }

  const userCreated = await createUser(newUser);

  if(!userCreated){
    throw createError({
      status: 418,
      message: "User could not be created",
    });
  }

  return {
    status: 201,
    message: 'User created',
  }
  
  
});