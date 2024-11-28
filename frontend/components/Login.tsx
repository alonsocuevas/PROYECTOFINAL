import Registration from "./Registration";
import SeparatorLine from "./SeparatorLine";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import config from "@/utils/config";
import { CodeStatus, Status } from "@/utils/definitions";
import Alert from "./alerts/Alert";

export default function Login({onSwitchMode} : any){
  const router = useRouter();
  const [notification, setNotification] = useState<Status>(Status.none);
  const [errorMessage, setErrorMessage] = useState<string>("");
  
  async function handleSubmit(event: FormEvent<HTMLFormElement>){
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = formData.get('correo');
    const password = formData.get('contrasena');

    const response = await fetch(`${config.NITRO_URL}api/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
  
    });
  
    if(response.ok){
      localStorage.user = JSON.stringify(await response.json());
      router.push('/dashboard');
    }
    
    else {
      if(response.status === CodeStatus.validationError){
        let message = "";
        message += "Correo y/o contraseña con formato inválidos.\n";
        message += "La contraseña debe ser mayor a 4 caracteres";
        setNotification(Status.error);
        setErrorMessage(message);
        setTimeout(() => setNotification(Status.none), 3500);
      }

      if(response.status === CodeStatus.invalidCredentials){
        setNotification(Status.error);
        setErrorMessage("Correo y/o contraseña incorrectas");
        setTimeout(() => setNotification(Status.none), 1500);
      }

      if(response.status === CodeStatus.notFound){
        setNotification(Status.error);
        setErrorMessage("No se ha podido encontrar tu usuario");
        setTimeout(() => setNotification(Status.none), 1500);
      }
    }

  }

  return (
    <>
      <Registration title="Ingresar">
        <form onSubmit={handleSubmit}>
          {/* Correo */}
          <div className="field">
            <label className="label">Correo</label>
            <div className="control">
              <input className="input" type="email" name="correo" placeholder="maria.fernanda@gmail.com" required/>
            </div>
          </div>

          {/* PIN */}
          <div className="field">
            <label className="label">Contraseña</label>
            <div className="control">
              <input className="input" type="password" name="contrasena" placeholder="****" required/>
            </div>
          </div>

          <SeparatorLine />

          {/* Botones */}
          <div className="columns">
            <div className="column">
              <div className="field">
                <div className="control">
                  {/* Iniciar sesión */}
                  <button className="button is-dark is-fullwidth" type="submit">Iniciar sesión</button>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <div className="control">
                  {/* Cancelar */}
                  <button className="button is-fullwidth" onClick={onSwitchMode}>Cancelar</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Registration>
      {notification === Status.error ? (
        <Alert>
          <Alert.Error message={errorMessage}/>
        </Alert>
      ) : null}
    </>
  );
}