'use client';
import { getHashedText } from '@/app/lib/auth';
import 'bulma/css/bulma.min.css';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import Alert from './alerts/Alert';
import { Status } from '@/app/utils/definitions';
import { useRouter } from 'next/navigation'

export default function CreateUserForm(){

  const [notification, setNotification] = useState(Status.none);
  const router = useRouter();

  async function onSubmit(event: FormEvent<HTMLFormElement>){
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    // Incrustar la clave y pin generados automáticamente
    // Aquí se puede usar una función que cree claves automáticamente
    formData.append('clave', getHashedText("miclave"));
    formData.append('pin', getHashedText("1234"));

    // Convertir rol y sueldo a number
    const pre_body  =   Object.fromEntries(formData);
    pre_body.rolId  =   +pre_body.rolId;
    pre_body.sueldo =   +pre_body.sueldo;

    // Convertir formdata a JSON
    const body = JSON.stringify(pre_body);
    
    const response = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      body: body,
      headers:{
        'Content-Type': 'application/json'
      }
    });

    if(response.ok){
      setNotification(Status.success);
      setTimeout(() => {
        setNotification(Status.none);
        router.push("/dashboard");
      }, 1500);
    }

    if(!response.ok) {
      setNotification(Status.error);
      setTimeout(() => {
        setNotification(Status.none);
      }, 1500);
    }
  }


  return (
    <>
      <div className="section has-background-white">
        <section className='section'></section>
        <div className="container is-max-tablet">
          {/* Títulos y subtítulos */}
          <div className="block">
            <div className="columns">
              <div className="column is-10">
                <h2 className="title is-2">Crear usuario</h2>
              </div>
            </div>
          </div>
          <div className="block">
            <h4 className="subtitle is-4">Detalles de usuario</h4>
          </div>
        
          <form onSubmit={onSubmit} className='has-background-white'>
            {/* RUT y Roles */}
            <div className="columns">
              <div className="column">
                <div className="field">
                  <label className="label" htmlFor="input_rut">RUT *</label>
                  <div className="control">
                    <input id="input_rut" name="rut" className="input" type="text" placeholder="12.345.678-9" required/>
                  </div>
                </div>
              </div>

              <div className="column">
                <div className="field">
                  <label className="label" htmlFor="select_rol">Rol de usuario *</label>
                  <div className="control">
                    <div className="select">
                      <select id="select_rol" name="rolId">
                          <option value="2">Empleado</option>
                          <option value="1">Administrador</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Nombres y apellidos */}
            <div className="columns">
              <div className="column">
                <div className="field">
                  <label className="label" htmlFor='input_nombres'>Nombres * </label>
                  <div className="control">
                      <input id="input_nombres" name="nombres" className="input" type="text" placeholder="María Fernanda" required/>
                  </div>
                </div>
              </div>

              <div className="column">
                  <div className="field">
                  <label className="label" htmlFor="input_apellidos">Apellidos * </label>
                  <div className="control">
                    <input id="input_apellidos" name="apellidos" className="input" type="text" placeholder="González Silva" required/>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Correo y sueldo base */}
            <div className="columns">
              <div className="column">
                <div className="field">
                  <label className="label" htmlFor="input_correo">Correo * </label>
                  <div className="control">
                    <input id="input_correo"  name="correo" className="input" type="text" placeholder="maria@correo.com" required/>
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="field">
                  <label className="label" htmlFor="input_sueldo">Sueldo * </label>
                  <div className="control">
                    <input id="input_sueldo" name="sueldo" className="input" type="number" placeholder="100000" required/>
                  </div>
                </div>
              </div>
            </div>

            {/* Cargo y área */}
            <div className="columns">
              <div className="column">
                <div className="field">
                  <label className="label" htmlFor="input_cargo">Cargo * </label>
                  <div className="control">
                    <input id="input_cargo" name="cargo" className="input" type="text" placeholder="Analista" required/>
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="field">
                  <label className="label" htmlFor="input_area">Área * </label>
                  <div className="control">
                    <input id="input_area" name="area" className="input" type="text" placeholder="Marketing" required/>
                  </div>
                </div>
              </div>
            </div>

            {/* Empresa */}
            <div className="columns">
              <div className="column">
                <div className="field">
                  <label className="label" htmlFor="input_empresa">Empresa * </label>
                  <div className="control">
                    <input id="input_empresa" name="empresa" className="input" type="text" placeholder="Empresa S.A." required/>
                  </div>
                </div>
              </div>

              {/* Tipo horario */}
              <div className="column">
                <div className="field">
                  <label className="label" htmlFor="select_turno">Turno *</label>
                  <div className="control">
                    <div className="select">
                      <select id="select_turno" name="turno">
                          <option value="mañana">Mañana</option>
                          <option value="tarde">Tarde</option>
                          <option value="noche">Noche</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="field is-grouped">
              <div className="control">
                <button className="button is-link" type='submit'>Enrolar usuario</button>
              </div>
              <div className="control">
                <Link href="/dashboard" className="button is-link is-light" aria-label="delete">Cancelar</Link>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Notificación de éxito al actualizar un usuario */}
      {
          notification === Status.success ?(
            <Alert>
              <Alert.Success message="Usuario creado" />
            </Alert>
          ) : null
      }

      {
        notification === Status.error ? (
          <Alert>
            <Alert.Error message="Error al crear usuario" />
          </Alert>
        ) : null
      }
    </>
  );
}