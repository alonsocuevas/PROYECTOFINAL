import Link from "next/link";
import CustomNavbar from "./CustomNavbar";
import Logout from "./Logout";
import { CalendarIcon } from "./icons/CalendarIcon";
import WrapperAdminTable from "./WrapperAdminTable";

export default function AdminDashboard() {
  return (
    <>
      {/* Mensaje de bienvenida */}
      <CustomNavbar />
      <div className='columns'>
      {/* Panel lateral izquierdo */}
      <div className='column is-2'>
          <div className="columns has-background-white">
            <div className="column is-10">
                <section className={`hero is-fullheight-with-navbar has-background-dark`}>
                <div className="hero-body">
                    <div className="container">
                        <div className="block">
                        <Link href="/dashboard/create" className="button">Enrolar usuario</Link>
                        </div>
                    </div>
                </div>

                {/* Botón de cerrar sesión */}
                <Logout />
                </section>
            </div>
          <div className="column"></div>
          </div>
      </div>
      <div className='column has-background-white'>
          <div className="columns">
              <div className="column is-3">
                  <div className="field mt-6">
                  {/* Buscar trabajador */}
                  <label className="label is-medium">Buscar trabajador</label>
                  <div className="control">
                      <input className="input" type="text" placeholder="Juan Pérez" />
                  </div>
                  </div>
                  {/* Filtrar por fecha */}
                  <div className="field mt-5">
                  <span className="icon-text">
                      <span className='label is-medium'>Filtrar por fecha</span>
                      <span className='icon is-medium'><CalendarIcon /></span>
                  </span>
                  </div>
              </div>
          </div>
            {/* Tabla */}
            {/* {children} */}
            {<WrapperAdminTable />}
          </div>
      </div>
    </>
  );
}