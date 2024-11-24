import { parserUser } from "~/utils/repositories/schemes/User";
import { updateUser } from "~/utils/repositories/users";

export default eventHandler(async (event) => {

  const newUser = await readValidatedBody(event, parserUser);

  if(!await updateUser(newUser.rut, newUser)) {
  throw createError({
    status: 404,
    message: "User does not exist",
  });
  }

  setResponseStatus(event, 200, "User updated successfully");
});