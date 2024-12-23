import Registration from "@/components/Registration";
import SeparatorLine from "./SeparatorLine";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Status } from "@/utils/definitions";
import Alert from "./alerts/Alert";
import config from "@/utils/config";

export default function PinChecking({onChangeCheckingMode} : any){
  const router = useRouter();
  const [notification, setNotification] = useState<Status>(Status.none);

  async function handleSubmit(event: FormEvent<HTMLFormElement>){
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const rut = formData.get('rut');
    const pin = formData.get('pin');

    // Se envía por POST a un endpoint el rut y pin
    // Luego en el server se verifica si el rut existe y si el pin
    // es correcto
    // Si es así, se devuelve en la respuesta el usuario encontrado
    const response = await fetch(`${config.NITRO_URL}api/attendances/checking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rut, pin }),
    });

    if(response.ok){
      // Si la respuesta es correcta, se realiza la marcación
      // Y se redirige al usuario al home
      const newResponse = await fetch(`${config.NITRO_URL}api/attendances`, {
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
      setNotification(Status.success);
      setTimeout(() => setNotification(Status.none), 1500);
    }
    
    if(!response.ok){
      setNotification(Status.error);
      setTimeout(() => setNotification(Status.none), 1500);
    }
  }

  return (
    <>
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
      {/* Alerta de éxito al marcar la asistencia */}
      {notification === Status.success && (
        <Alert>
          <Alert.Success message="Asistencia marcada"/>
        </Alert>
      )}

      {/* Alerta de error si no se pudo marcar la asistencia */}
      {notification === Status.error && (
        <Alert>
          <Alert.Error message="No se pudo marcar la asistencia"/>
        </Alert>
      )}
    </>
  );
}