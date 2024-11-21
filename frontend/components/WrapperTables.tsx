import { fetchAttendances, fetchUsers } from "@/app/utils/data";
import TableAdmin from "./TableAdmin";
import { Attendance, User } from "@/app/utils/definitions";

export default async function WrapperTables(){
    let users: User[] = await fetchUsers();
    const attendances: Attendance[] = await fetchAttendances();

  return (
    <TableAdmin users={users} attendance={attendances}/>
    // <TableUser users={users} attendance={attendances}/>
  );
}