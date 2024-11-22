'use client';
import { Attendance, User } from "@/app/utils/definitions";
import StrongUserDetails from "./StrongUserDetails";

export default function TableUser({ users, attendance} : {users: User[]; attendance: Attendance[]; }){

  const loggedUser = JSON.parse(localStorage.user);

    return (
      <>
        <div className="columns mt-5">
          {/* Nombre de trabajador actual */}
          <div className="column is-7">
            <StrongUserDetails />
          </div>
        </div>

        <div className="mr-6">
          <table className='table is-hoverable is-fullwidth'>
            <thead>
              <tr>
                <th>RUT</th>
                <th>Fecha</th>
                <th>Entró</th>
                <th>Salió</th>
                <th>Horas totales</th>
              </tr>
            </thead>
            <tbody>
              {attendance.filter(
                (attendanceByRut) => attendanceByRut.usuarioRut === loggedUser.rut)
                .map((attendance: Attendance) => (
                  <tr key={attendance.id}>
                    {/* RUT */}
                    <th>{attendance.usuarioRut}</th>
                    {/* Fecha */}
                    <td>
                      {`
                        ${new Date(attendance.fecha).toLocaleString()}
                      `}
                    </td>
                    {/* Hora entrada */}
                    <td>
                      {`
                        ${new Date(attendance.horaEntrada).getHours().toString().padStart(2, "0")}:
                        ${new Date(attendance.horaEntrada).getMinutes().toString().padStart(2, "0")}:
                        ${new Date(attendance.horaEntrada).getSeconds().toString().padStart(2, "0")}
                      `}
                    </td>
                    {/* Hora salida */}
                    <td>
                      {`
                        ${new Date(attendance.horaSalida).getHours().toString().padStart(2, "0")}:
                        ${new Date(attendance.horaSalida).getMinutes().toString().padStart(2, "0")}:
                        ${new Date(attendance.horaSalida).getSeconds().toString().padStart(2, "0")}
                      `}
                    </td>
                    {/* Horas totales */}
                    <td>
                      {`
                        ${(
                          (new Date(attendance.horaSalida).getTime() - 
                          new Date(attendance.horaEntrada).getTime()) / 1000 / 60 / 60).toString().padStart(2, "0")}:
                        ${((new Date(attendance.horaSalida).getTime() - new Date(attendance.horaEntrada).getTime()) / 1000 / 60).toString().padStart(2, "0") }
                      `}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </>
    );
}