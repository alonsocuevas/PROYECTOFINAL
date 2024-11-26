import { fetchAttendances, fetchUsers } from "@/utils/data";
import { Attendance, User } from "@/utils/definitions";
import TableAdmin from "./TableAdmin";
import ExportCSV from "./ExportCSV";

export default async function WrapperAdminTable(){
    let users: User[] = await fetchUsers();
    const attendances: Attendance[] = await fetchAttendances();

  return (
    <TableAdmin users={users} attendance={attendances}>
      <ExportCSV data={attendances}/>
    </TableAdmin>
  );
}