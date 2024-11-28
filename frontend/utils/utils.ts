import { EmptyQRCodeError, EmptyRUTError, NoCommonFormatRUTError, NoRUTError } from "./errors";

/**
 * 
 * @param qrCode Una cadena de texto en la que buscar un RUT.
 * Devuelve el RUT encontrado.
 * @throws {EmptyQRCodeError} Lanzará un error si la cadena a analizar está vacía.
 */
export function extractRUTFromText(qrCode: string){

  if(qrCode.length === 0){
    throw new EmptyQRCodeError("Se proporcionó un valor vacío");
  }

  const regex: RegExp = /\d{8}-\d/;
  const result = regex.exec(qrCode);
  
  if(!result){
    throw new NoRUTError("La entrada no contiene un RUT");
  }

  return result[0];
}


export function formatRUT(rut: string): any {
  const cleanRut: string = rut.trim();

  const regex: RegExp = /^(\d{1,2})(\d{3})(\d{3})(-\d)$/;
  const match = cleanRut.match(regex);

  if (rut.length === 0) {
    throw new EmptyRUTError("Se proporcionó un valor vacío");
  }

  if (!match) {
    throw new NoCommonFormatRUTError("RUT no tiene el formato regex ^(\\d{1,2})(\\d{3})(\\d{3})(-\\d)$");
  }

  const [_, grupo1, grupo2, grupo3, verificationDigit] = match;

  return `${grupo1}.${grupo2}.${grupo3}${verificationDigit}`;
}

/**
 * 
 * @param textToFindRUT La URL en la que buscar el RUT.
 * Devuelve el RUT encontrado.
 * @returns El RUT en formato 19.999.999-9
 * @throws {EmptyRUTError} Lanza un error  de tipo EmptyRUTError si el texto no está vacío.
 * @throws {NoRUTError} Lanza un error de tipo NoRUTError si no se encuentra el RUT en el texto 
 * con el formato 99999999-9.
 */
export function getNiceRUT(textToFindRUT: string){
  
  if(textToFindRUT === ""){
    throw new EmptyRUTError("El RUT no se encontró");
  }

  try {
    const extractedRUT = extractRUTFromText(textToFindRUT);
    return formatRUT(extractedRUT);
  }

  catch(error){

    if(error instanceof NoRUTError){
      throw error;
    }

    console.error(error);
  }
}