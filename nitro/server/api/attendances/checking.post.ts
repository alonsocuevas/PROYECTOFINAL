import { parserPinChecking } from "~/utils/repositories/schemes/User";

export default eventHandler(async (event) => {

    const body = await readValidatedBody(event, parserPinChecking);

    const foundUser = await findUserByRUT(body.rut);

    if(foundUser){
        if(!matchHashes(body.pin, foundUser.pin)){
          throw createError({
            status: 401,
            message: "Credenciales inválidas",
          });
        }
      }
      else {
        throw createError({
          status: 404,
          message: "Usuario no encontrado",
        });
      }


    return foundUser;
});