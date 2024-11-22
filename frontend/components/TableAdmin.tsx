'use client';
import { useRef, useState } from "react";
import { Attendance, User } from "@/app/utils/definitions";
import StrongUserDetails from "./StrongUserDetails";
import ExportCSV from "./ExportCSV";
import { deleteUser } from "@/app/utils/data";

enum Mode {
  visualization = 1,
  attendances   = 2,
  remove        = 3,
  update        = 4
}

export default function TableUsers({ users, attendance} : {users: User[]; attendance: Attendance[]; }){

  const [mode, setMode] = useState(1);
  const refRut = useRef("");

  if(mode === Mode.visualization){
    return (
      <>
        <div className="columns mt-5">
          {/* Nombre de trabajador actual */}
          <div className="column is-7">
            <StrongUserDetails />
          </div>
          <div className="column is-3 is-flex is-justify-content-flex-end">
            <div className="buttons">
              <button onClick={() => setMode(Mode.remove)} className="button is-danger is-light">Quitar empleado</button>
              <button onClick={() => setMode(Mode.update)} className="button is-info is-light">Modificar empleado</button>
            </div>
          </div>
          <div className="column is-flex is-justify-content-flex-end mr-6">
            {/* Exportar a CSV */}
            <ExportCSV dataToExport={[{}]}/>
          </div>
        </div>
        <div className="mr-6">
          <table className='table is-hoverable is-fullwidth'>
            <thead>
              <tr>
                <th>Asistencia</th>
                <th>RUT</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Correo</th>
                <th>Área</th>
                <th>Cargo</th>
                <th>Turno</th>
                <th>Empresa</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: User) => (
              <tr key={user.rut}>
                <th>
                  
                  <button onClick={() => {
                    refRut.current = user.rut;
                    setMode(Mode.attendances);
                  }} className='button is-light' >
                    Ver
                  </button>
                </th>
                <th>{user.rut}</th>
                <td>{user.nombres}</td>
                <td>{user.apellidos}</td>
                <td>{user.correo}</td>
                <td>{user.area}</td>
                <td>{user.cargo}</td>
                <td>{user.turno}</td>
                <td>{user.empresa}</td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }

  if(mode === Mode.attendances){
    return (
      <>
        <div className="columns mt-5">
          {/* Nombre de trabajador actual */}
          <div className="column is-7">
            <StrongUserDetails />
          </div>
          <div className="column is-3 is-flex is-justify-content-flex-end">
            <div className="buttons">
              <button onClick={() => setMode(Mode.remove)} className="button is-danger is-light">Quitar empleado</button>
              <button onClick={() => setMode(Mode.update)} className="button is-info is-light">Modificar empleado</button>
            </div>
          </div>
          <div className="column is-flex is-justify-content-flex-end mr-6">
            {/* Exportar a CSV */}
            <ExportCSV dataToExport={[{}]}/>
          </div>
        </div>

        <div className="mr-6">
        <table className='table is-hoverable is-fullwidth'>
          <thead>
            <tr>
              <th>
                <button onClick={() => setMode(Mode.visualization)} className='button is-light' >
                  Volver
                </button>
              </th>
              <th>RUT</th>
              <th>Fecha</th>
              <th>Entró</th>
              <th>Salió</th>
              <th>Horas totales</th>
            </tr>
          </thead>
          <tbody>
            {attendance.filter(
              (attendanceByRut) => attendanceByRut.usuarioRut === refRut.current)
              .map((attendance: Attendance) => (
            <tr key={attendance.id}>
              <th>
              </th>
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
            ))}
          </tbody>
        </table>
        </div>
      </>
    );
  }

  if(mode === Mode.remove){
    return (
      <>
        <div className="columns mt-5">
          {/* Nombre de trabajador actual */}
          <div className="column is-6">
            <StrongUserDetails />
          </div>
          <div className="column is-4 is-flex is-justify-content-flex-end">
            <div className="buttons">
              <button onClick={() => {setMode(Mode.remove)}} className="button is-danger is-light">Quitar empleado</button>
              <button onClick={() => {setMode(Mode.update)}} className="button is-info is-light">Modificar empleado</button>
            </div>
          </div>
          <div className="column is-flex is-justify-content-flex-end mr-6">
            {/* Exportar a CSV */}
            <ExportCSV dataToExport={[{}]}/>
          </div>
        </div>

        <div className="mr-6">
          <table className='table is-hoverable is-fullwidth'>
            <thead>
              <tr>
                <th>
                  <button onClick={() => setMode(Mode.visualization)} className="button is-light">
                    Volver
                  </button>
                </th>
                <th>RUT</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Correo</th>
                <th>Área</th>
                <th>Cargo</th>
                <th>Turno</th>
                <th>Empresa</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: User) => (
              <tr key={user.rut}>
                <th>
                  <button onClick={() => {
                    
                  }} className='button is-light is-danger' >
                    Quitar
                  </button>
                </th>
                <th>{user.rut}</th>
                <td>{user.nombres}</td>
                <td>{user.apellidos}</td>
                <td>{user.correo}</td>
                <td>{user.area}</td>
                <td>{user.cargo}</td>
                <td>{user.turno}</td>
                <td>{user.empresa}</td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }

  if(mode === Mode.update){
    return (
      <>
        <div className="columns mt-5">
          {/* Nombre de trabajador actual */}
          <div className="column is-6">
            <StrongUserDetails />
          </div>
          <div className="column is-4 is-flex is-justify-content-flex-end">
            <div className="buttons">
              <button onClick={() => {setMode(Mode.remove)}} className="button is-danger is-light">Quitar empleado</button>
              <button onClick={() => {setMode(Mode.update)}} className="button is-info is-light">Modificar empleado</button>
            </div>
          </div>
          <div className="column is-flex is-justify-content-flex-end mr-6">
            {/* Exportar a CSV */}
            <ExportCSV dataToExport={[{}]}/>
          </div>
        </div>

        <div className="mr-6">
          <table className='table is-hoverable is-fullwidth'>
            <thead>
              <tr>
                <th>
                  <button onClick={() => setMode(Mode.visualization)} className="button is-light">
                    Volver
                  </button>
                </th>
                <th>RUT</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Correo</th>
                <th>Área</th>
                <th>Cargo</th>
                <th>Turno</th>
                <th>Empresa</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: User) => (
              <tr key={user.rut}>
                <th>
                  <button onClick={() => {
                    refRut.current = user.rut;
                    // Código para modificar un usuario
                  }} className='button is-light is-info' >
                    Modificar
                  </button>
                </th>
                <th>{user.rut}</th>
                <td>{user.nombres}</td>
                <td>{user.apellidos}</td>
                <td>{user.correo}</td>
                <td>{user.area}</td>
                <td>{user.cargo}</td>
                <td>{user.turno}</td>
                <td>{user.empresa}</td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}