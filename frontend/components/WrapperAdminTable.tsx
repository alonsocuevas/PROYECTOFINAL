import { fetchAttendances, fetchUsers } from "@/app/utils/data";
import { Attendance, User } from "@/app/utils/definitions";
import TableAdmin from "./TableAdmin";

export default async function WrapperAdminTable(){
    let users: User[] = await fetchUsers();
    const attendances: Attendance[] = await fetchAttendances();

  return (
    <TableAdmin users={users} attendance={attendances}/>
  );
}