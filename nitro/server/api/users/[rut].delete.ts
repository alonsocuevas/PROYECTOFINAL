export default eventHandler(async (event) => {
  const rut = getRouterParam(event, "rut");

   if(!await deleteUser(rut)){
    throw createError({
      status: 418,
      message: "User does not exist",
    });
   }

   return null;
});