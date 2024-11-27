'use client';
import { useRef, useState } from "react";
import { Attendance, Mode, Status, User } from "@/utils/definitions";
import StrongUserDetails from "./StrongUserDetails";
import { deleteUser, updateUser } from "@/utils/data";
import Alert from "./alerts/Alert";

export default function TableUsers({ users, attendance, children} : {users: User[]; attendance: Attendance[]; children: any}){

  const [mode, setMode] = useState(1);
  const refRut = useRef("");
  const [editingRows, setEditingRows] = useState(users.map(() => false));
  const [updatedUsers, setUpdateUsers] = useState(users.map((user) => ({ ...user })));
  const [notification, setNotification] = useState<Status>(Status.none);

  const handleEditUser = (rowIndex: number) => {
    // Le paso un updater function a setEditingRows
    // prevEditingRows es el valor anterior del estado editingRows
    setEditingRows((prevEditingRows) => {
      // Creo una copia del estado anterior
      const updatedEditingRows = [...prevEditingRows];
      // Actualizo la copia
      updatedEditingRows[rowIndex] = !prevEditingRows[rowIndex];
      // Devuelvo la copia como el nuevo estado
      return updatedEditingRows;
    });
  };

  const handleInputChange = (rowIndex: number, field: string, value:string) => {
    setUpdateUsers((prevEditValues) => {
      // Se crea una copia del arreglo prevEditValues
      const updatedEditValues = [...prevEditValues];
      // En la posición updatedEditValues[rowIndex]
      // Se envía un objeto con las nuevas propiedades
      updatedEditValues[rowIndex] = { 
        ...updatedEditValues[rowIndex], 
        [field]: value 
      };
      return updatedEditValues;
    });
  };

  const handleSaveUser  = (rowIndex: number) => {
    const user: User = updatedUsers[rowIndex];
    updateUser(user);
    handleEditUser(rowIndex); // Cierra el modo de edición
    setNotification(Status.success);
    setTimeout(() => setNotification(Status.none), 1500);
  };

  const handleDeleteUser = (rut: string) => {
    deleteUser(rut);
    setNotification(Status.success);
    setTimeout(() => setNotification(Status.none), 1500);
    setMode(Mode.remove);
  }


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
            {children}
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
            {children}
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
            {children}
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
                  <button onClick={() => handleDeleteUser(user.rut)
                  } className='button is-light is-danger' >
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

        {/* Notificación de éxito al actualizar un usuario */}
        {
          notification === Status.success ?(
            <Alert>
              <Alert.Success message="Usuario eliminado" />
            </Alert>
          ) : null
        }
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
            {children}
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
              {users.map((user: User, rowIndex) => (
              <tr key={user.rut}>
                <th>
                  {editingRows[rowIndex] ? (
                    <button onClick={() => handleSaveUser(rowIndex)} className='button is-light is-success' type="submit">
                      Guardar
                    </button>
                  ) : (
                    <button onClick={() => handleEditUser(rowIndex)} className='button is-light is-info' >
                      Modificar
                    </button>
                  )}
                </th>

                {editingRows[rowIndex] ? (
                  <>
                    <td>
                      <input className="input" type="text" value={updatedUsers[rowIndex].rut} 
                      onChange={(e) => handleInputChange(rowIndex, 'rut', e.target.value)}/>
                    </td>
                    <td>
                      <input className="input" type="text" defaultValue={updatedUsers[rowIndex].nombres}
                      onChange={(e) => handleInputChange(rowIndex, 'nombres', e.target.value)}/>
                    </td>
                    <td>
                      <input className="input" type="text" defaultValue={updatedUsers[rowIndex].apellidos}
                      onChange={(e) => handleInputChange(rowIndex, 'apellidos', e.target.value)}/>
                    </td>
                    <td>
                      <input className="input" type="email" defaultValue={updatedUsers[rowIndex].correo}
                      onChange={(e) => handleInputChange(rowIndex, 'correo', e.target.value)}/>
                    </td>
                    <td>
                      <input className="input" type="text" defaultValue={updatedUsers[rowIndex].area}
                      onChange={(e) => handleInputChange(rowIndex, 'area', e.target.value)}/>
                    </td>
                    <td>
                      <input className="input" type="text" defaultValue={updatedUsers[rowIndex].cargo}
                      onChange={(e) => handleInputChange(rowIndex, 'cargo', e.target.value)}/>
                    </td>
                    <td>
                      <input className="input" type="text" defaultValue={updatedUsers[rowIndex].turno}
                      onChange={(e) => handleInputChange(rowIndex, 'turno', e.target.value)}/>
                    </td>
                    <td>
                      <input className="input" type="text" defaultValue={updatedUsers[rowIndex].empresa}
                      onChange={(e) => handleInputChange(rowIndex, 'empresa', e.target.value)}/>
                    </td>     
                  </>             
                ) : (
                    <>
                      <td>{updatedUsers[rowIndex].rut}</td>
                      <td>{updatedUsers[rowIndex].nombres}</td>
                      <td>{updatedUsers[rowIndex].apellidos}</td>
                      <td>{updatedUsers[rowIndex].correo}</td>
                      <td>{updatedUsers[rowIndex].area}</td>
                      <td>{updatedUsers[rowIndex].cargo}</td>
                      <td>{updatedUsers[rowIndex].turno}</td>
                      <td>{updatedUsers[rowIndex].empresa}</td>
                    </>
                  )
                }
              </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Notificación de éxito al actualizar un usuario */}
        {
          notification === Status.success ?(
            <Alert>
              <Alert.Success message="Usuario actualizado" />
            </Alert>
          ) : null
        }
        
      </>
    );
  }
}