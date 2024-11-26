import { IDetectedBarcode } from "@yudiel/react-qr-scanner";
import QRScanner from "./QRScanner";
import { formatRUT, getNiceRUT } from "@/utils/utils";
import { EmptyRUTError, NoRUTError } from "@/utils/errors";
import config from "@/utils/config";

export default function CheckingRegister(){

  async function fetchUser(rut: string){
  
    const response = await fetch(`${config.NITRO_URL}api/users/exists/${rut}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
  
    });
  
    if(response.ok){
      // Se hace un POST al endpoint de asistencia (/api/attendances) para crearle
      // una asistencia al rut escaneado
      const response = await fetch(`${config.NITRO_URL}api/attendances`, {
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
    }
    
    else {
      return;
    }
  }

  const handleSuccess = (detectedCodes: IDetectedBarcode[]) => {
    const lastRutDetected = detectedCodes[detectedCodes.length-1].rawValue;

    try {
      fetchUser(getNiceRUT(lastRutDetected));
    } 
    
    catch (error) {

      if(error instanceof EmptyRUTError){
        console.log("Error: El texto escaneado está vacío");
      }

      else if(error instanceof NoRUTError){
        console.log("Error: El texto escaneado no contiene un RUT en el formato 99999999-9");
      }

      else {
        console.log(error);
      }
    }
  };

  return <QRScanner width="200px" onScan={handleSuccess}/>;
}