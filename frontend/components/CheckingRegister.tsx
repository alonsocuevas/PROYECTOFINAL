import { IDetectedBarcode } from "@yudiel/react-qr-scanner";
import QRScanner from "./QRScanner";
import { getNiceRUT } from "@/utils/utils";

export default function CheckingRegister(){
  const domain: string = "http://localhost:3000/api";

  async function fetchUser(rut: string){
  
    const response = await fetch(`${domain}/users/exists/${rut}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
  
    });
  
    if(response.ok){
      // Se hace un POST al endpoint de asistencia (/api/attendances) para crearle
      // una asistencia al rut escaneado
      const response = await fetch(`${domain}/attendances`, {
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
    fetchUser(getNiceRUT(lastRutDetected));
  };

  return <QRScanner width="200px" onScan={handleSuccess}/>;
}