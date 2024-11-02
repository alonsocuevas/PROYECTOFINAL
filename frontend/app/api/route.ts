import { fetchUsers } from "@/app/utils/data";

export async function GET(request: Request){
  return Response.json(await fetchUsers());
}