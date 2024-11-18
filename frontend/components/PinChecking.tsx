import Registration from "@/components/Registration";
import SeparatorLine from "./SeparatorLine";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function PinChecking({onChangeCheckingMode} : any){
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>){
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const rut = formData.get('rut');
    const pin = formData.get('pin');

    // Se envía por POST a un endpoint el rut y pin
    // Luego en el server se verifica si el rut existe y si el pin
    // es correcto
    // Si es así, se devuelve en la respuesta el usuario encontrado
    const response = await fetch('http://localhost:3000/api/attendances/checking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rut, pin }),
    });

    if(response.ok){
      // Si la respuesta es correcta, se realiza la marcación
      // Y se redirige al usuario al home
      const newResponse = await fetch(`http://localhost:3000/api/attendances`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "fecha": new Date(),
          "horaEntrada": new Date(),
          "horaSalida": new Date(),
          "usuarioRut": rut,
        })
      });
      router.push('/');
    }
    
    else {
      // si la respuesta es negativa
      // se muestra un componente indicando credenciales incorrectas
    }
  }

  return (
    <Registration title="Marcaje">
      <form onSubmit={handleSubmit}>
        {/* RUT */}
        <div className="field">
          <label className="label">RUT</label>
          <div className="control">
            <input className="input" type="text" name="rut" placeholder="12.345.678-9" required/>
          </div>
        </div>

        {/* PIN */}
        <div className="field">
          <label className="label">PIN</label>
          <div className="control">
            <input className="input" type="password" name="pin" placeholder="****" required/>
          </div>
        </div>

        <SeparatorLine />

        {/* Botones */}
        <div className="columns">
          <div className="column">
            <div className="field">
              <div className="control">
                {/* Marcar */}
                <button className="button is-dark is-fullwidth" type="submit">Marcar asistencia</button>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <div className="control">
                {/* Cancelar */}
                <button className="button is-fullwidth" onClick={onChangeCheckingMode}>Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Registration>
  );
}