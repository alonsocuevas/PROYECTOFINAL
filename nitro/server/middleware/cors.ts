export default defineEventHandler((event) => {
  setResponseHeaders(event, {
    "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "Access-Control-Allow-Origin": "http://192.168.1.10",
    'Access-Control-Allow-Credentials': 'true',
    "Access-Control-Allow-Headers": '*',
    "Access-Control-Expose-Headers": '*'
  });

  if (isPreflightRequest(event)) {
    return null;
  }
});