import CustomNavbar from "./CustomNavbar";
import Logout from "./Logout";
import { CalendarIcon } from "./icons/CalendarIcon";
import WrapperUserTable from "./WrapperUserTable";

export default function UserDashboard() {
  return (
    <>
      {/* Mensaje de bienvenida */}
      <CustomNavbar />
      <div className='columns'>
      {/* Panel lateral izquierdo */}
      <div className='column is-2'>
          <div className="columns has-background-white">
            <div className="column is-10">
                <section className={`hero is-fullheight-with-navbar has-background-dark is-flex is-justify-content-flex-end`}>
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
            {<WrapperUserTable />}
          </div>
      </div>
    </>
  );
}