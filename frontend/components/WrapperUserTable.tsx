import { fetchAttendances, fetchUsers } from "@/utils/data";
import { Attendance, User } from "@/utils/definitions";
import TableUser from "./TableUser";

export default async function WrapperUserTable(){
    let users: User[] = await fetchUsers();
    const attendances: Attendance[] = await fetchAttendances();

  return (
    <TableUser users={users} attendance={attendances}/>
  );
}