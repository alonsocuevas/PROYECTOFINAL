import { fetchAttendances, fetchUsers } from "@/app/utils/data";
import { Attendance, User } from "@/app/utils/definitions";
import TableUser from "./TableUser";

export default async function WrapperUserTable(){
    let users: User[] = await fetchUsers();
    const attendances: Attendance[] = await fetchAttendances();

  return (
    <TableUser users={users} attendance={attendances}/>
  );
}