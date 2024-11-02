-- CreateTable
CREATE TABLE "User" (
    "rut" TEXT NOT NULL PRIMARY KEY,
    "nombres" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "clave" INTEGER NOT NULL,
    "area" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "tipHorario" TEXT NOT NULL,
    "empresa" TEXT NOT NULL,
    "asistencia" DATETIME,
    "qrCode" TEXT,
    "pin" INTEGER NOT NULL
);
