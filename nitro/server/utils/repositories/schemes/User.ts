import * as v from 'valibot';

enum Rol {
  Administrador = 1,
  Empleado = 2,
}

enum Turno {
  Mañana = 'mañana',
  Tarde = 'tarde',
  Noche = 'noche',
}

const createUserScheme = v.object(
  {
    rut: v.pipe(
      v.string(),
      v.minLength(12),
      v.maxLength(12),
    ),

    nombres: v.pipe(
      v.string(),
      v.minLength(5),
      v.maxLength(40),
    ),

    apellidos: v.pipe(
      v.string(),
      v.minLength(5),
      v.maxLength(40),
    ),

    correo: v.pipe(
      v.string(),
      v.email(),
      v.minLength(10),
      v.maxLength(50)
    ),

    sueldo: v.pipe(
        v.number(),
        v.minValue(0),
        v.maxValue(5000000)
      ),

    cargo: v.pipe(
      v.string(),
      v.minLength(5),
      v.maxLength(40),
    ),

    area: v.pipe(
      v.string(),
      v.minLength(5),
      v.maxLength(40),
    ),

    empresa: v.pipe(
      v.string(),
      v.minLength(5),
      v.maxLength(40),
    ),

    turno: v.enum(Turno),
    rolId: v.enum(Rol),

    qrCode: v.optional(
      v.pipe(
        v.string(),
        v.minLength(5),
        v.maxLength(40),
      )
    ),
    
    clave: v.pipe(
      v.string(),
      v.minLength(30),
      v.maxLength(100),
    ),
    
    pin: v.pipe(
      v.string(),
      v.minLength(60),
      v.maxLength(60)
    )
  }
);

const loginScheme = v.object(
  {
    email: v.pipe(
      v.string(),
      v.email()
    ),

    password: v.pipe(
      v.string(),
      v.minLength(5),
      v.maxLength(20),
    )
  }
);

const pinCheckingScheme = v.object(
  {
    rut: v.pipe(
      v.string(),
      v.minLength(12),
      v.maxLength(12),
    ),

    pin: v.pipe(
      v.string(),
      v.minLength(4),
      v.maxLength(4),
    )
  }
);


export const parserUser = v.parser(createUserScheme);
export const parserLogin = v.parser(loginScheme);
export const parserPinChecking = v.parser(pinCheckingScheme);

// Custom Types
export type FormCreateUser = v.InferInput<typeof createUserScheme>;