export type User = {
    rut: string;
    nombres: string;
    apellidos: string;
    correo: string;
    clave: string;
    area: string;
    cargo: string;
    turno: string;
    empresa: string;
    qrCode: string;
    pin: string;
    sueldo: number;
    rolId: number;
};

export type Attendance = {
    id: number;
    horaEntrada: Date;
    horaSalida: Date;
    fecha: Date;
    usuarioRut: string;
}

export type ChildrenProp<P = unknown> = P & { children: React.ReactNode };

export enum Mode {
    visualization = 1,
    attendances   = 2,
    remove        = 3,
    update        = 4
}
  
export enum Status {
    success = "success",
    error     = "error",
    none   = "none"
}