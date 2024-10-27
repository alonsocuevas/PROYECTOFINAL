-- CreateTable
CREATE TABLE "Usuario" (
    "rut" TEXT NOT NULL PRIMARY KEY,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "clave" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "tipoHorario" TEXT NOT NULL,
    "empresa" TEXT NOT NULL,
    "asistencia" TEXT NOT NULL,
    "qrCode" TEXT NOT NULL,
    "pin" INTEGER NOT NULL
);