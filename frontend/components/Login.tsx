import Registration from "./Registration";
import SeparatorLine from "./SeparatorLine";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import config from "@/utils/config";

export default function Login({onSwitchMode} : any){
  const router = useRouter();

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
      return;
    }
  }

  return (
    
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
  );
}