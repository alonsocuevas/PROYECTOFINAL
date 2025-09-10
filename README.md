# SAA - Simple App Attendance

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)
![License](https://img.shields.io/badge/license-ISC-green.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.0-black.svg)
![Nitro](https://img.shields.io/badge/Nitro-Latest-orange.svg)

## 📋 Descripción

**SAA (Simple App Attendance)** es un sistema de control de asistencia desarrollado como proyecto final de título para la Ingeniería en Computación e Informática. La aplicación permite gestionar el registro de asistencia de empleados mediante diferentes métodos de autenticación (QR y PIN), con roles diferenciados para administradores y usuarios.

## 🚀 Características Principales

### 🔐 Sistema de Autenticación
- **Login con email y contraseña** para acceso al dashboard
- **Marcaje por QR** - Escaneo de códigos QR para registro de asistencia
- **Marcaje por PIN** - Autenticación mediante RUT y PIN personal
- **Roles diferenciados** - Administrador y Empleado con permisos específicos

### 👥 Gestión de Usuarios
- **Creación de usuarios** con información completa (RUT, nombres, apellidos, correo, cargo, área, empresa, turno, sueldo)
- **Asignación de roles** (Administrador/Empleado)
- **Generación automática** de credenciales (PIN y contraseña)
- **Validación de datos** con esquemas de validación robustos

### 📊 Dashboard y Reportes
- **Dashboard administrativo** con gestión completa de usuarios y asistencias
- **Dashboard de empleado** con vista personalizada de asistencias
- **Tablas interactivas** con filtros y búsqueda
- **Exportación de datos** a CSV
- **Filtros por fecha** para consultas específicas

### 🎯 Control de Asistencia
- **Registro de entrada y salida** con timestamps precisos
- **Validación de credenciales** antes del marcaje
- **Historial completo** de asistencias por usuario
- **Interfaz intuitiva** para marcaje rápido

## 🛠️ Stack Tecnológico

### Frontend
- **Next.js 15.0** - Framework React con App Router
- **React 18** - Biblioteca de interfaz de usuario
- **TypeScript 5.0** - Tipado estático
- **Bulma CSS** - Framework CSS moderno
- **@yudiel/react-qr-scanner** - Escáner de códigos QR
- **export-to-csv** - Exportación de datos

### Backend
- **Nitro** - Framework web moderno y rápido
- **TypeScript 5.6** - Tipado estático
- **Prisma 5.21** - ORM y gestión de base de datos
- **SQLite** - Base de datos ligera y portable
- **Valibot** - Validación de esquemas
- **bcryptjs** - Encriptación de contraseñas
- **jsonwebtoken** - Autenticación JWT

### Herramientas de Desarrollo
- **Jest** - Framework de testing
- **ts-jest** - Compilador TypeScript para Jest
- **ESLint** - Linter de código
- **pnpm** - Gestor de paquetes

## 📁 Estructura del Proyecto

```
PROYECTOFINAL/
├── frontend/                 # Aplicación Next.js
│   ├── app/                 # App Router de Next.js
│   │   ├── dashboard/       # Páginas del dashboard
│   │   ├── layout.tsx       # Layout principal
│   │   └── page.tsx         # Página de inicio
│   ├── components/          # Componentes React
│   │   ├── alerts/          # Sistema de alertas
│   │   ├── icons/           # Iconos personalizados
│   │   ├── AdminDashboard.tsx
│   │   ├── UserDashboard.tsx
│   │   ├── Login.tsx
│   │   ├── Checking.tsx
│   │   └── ...
│   ├── utils/               # Utilidades y configuración
│   └── styles/              # Estilos CSS
├── nitro/                   # Backend con Nitro
│   ├── server/              # Código del servidor
│   │   ├── api/             # Endpoints de la API
│   │   │   ├── auth/        # Autenticación
│   │   │   ├── users/       # Gestión de usuarios
│   │   │   └── attendances/ # Control de asistencias
│   │   ├── middleware/      # Middleware (CORS)
│   │   └── utils/           # Utilidades del servidor
│   └── prisma/              # Base de datos
│       ├── schema.prisma    # Esquema de la base de datos
│       ├── migrations/      # Migraciones
│       └── seed.ts          # Datos de prueba
└── package.json             # Configuración del proyecto raíz
```

## 🗄️ Modelo de Datos

### Usuario
- `rut` (String, PK) - RUT único del usuario
- `nombres` (String) - Nombres del usuario
- `apellidos` (String) - Apellidos del usuario
- `correo` (String, Unique) - Email único
- `clave` (String) - Contraseña encriptada
- `area` (String) - Área de trabajo
- `cargo` (String) - Cargo del empleado
- `turno` (String) - Turno de trabajo
- `empresa` (String) - Empresa
- `qrCode` (String, Optional) - Código QR
- `pin` (String) - PIN encriptado
- `sueldo` (Int) - Sueldo base
- `rolId` (Int, FK) - Referencia al rol

### Asistencia
- `id` (Int, PK) - ID único
- `horaEntrada` (DateTime) - Hora de entrada
- `horaSalida` (DateTime) - Hora de salida
- `fecha` (DateTime) - Fecha del registro
- `usuarioRut` (String, FK) - Referencia al usuario

### Rol
- `id` (Int, PK) - ID único
- `nombre` (String) - Nombre del rol
- `usuarios` (Usuario[]) - Usuarios con este rol

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- pnpm (recomendado) o npm
- Git

### 1. Clonar el Repositorio
```bash
git clone <url-del-repositorio>
cd PROYECTOFINAL
```

### 2. Instalar Dependencias
```bash
# Instalar dependencias del proyecto raíz
pnpm install

# Instalar dependencias del frontend
cd frontend
pnpm install

# Instalar dependencias del backend
cd ../nitro
pnpm install
```

### 3. Configurar Base de Datos
```bash
# Desde la carpeta nitro/
cd nitro

# Generar el cliente de Prisma
npx prisma generate

# Ejecutar migraciones
npx prisma migrate dev

# (Opcional) Poblar la base de datos con datos de prueba
npx prisma db seed
```

### 4. Configurar Variables de Entorno
Crear archivo `.env` en la carpeta `nitro/`:
```env
DATABASE_URL="file:./prisma/dev.db"
```

### 5. Ejecutar la Aplicación

#### Desarrollo
```bash
# Terminal 1 - Backend (puerto 3000)
cd nitro
pnpm dev

# Terminal 2 - Frontend (puerto 3001)
cd frontend
pnpm dev
```

#### Producción
```bash
# Construir el backend
cd nitro
pnpm build

# Construir el frontend
cd frontend
pnpm build

# Ejecutar en producción
cd nitro
pnpm preview
```

## 📖 Uso de la Aplicación

### 1. Acceso Inicial
- Navegar a `http://localhost:3001`
- La aplicación mostrará la interfaz de marcaje por defecto

### 2. Marcaje de Asistencia
- **Por QR**: Acercar tarjeta al escáner
- **Por PIN**: Ingresar RUT y PIN personal

### 3. Acceso Administrativo
- Hacer clic en "Iniciar sesión"
- Ingresar credenciales de administrador
- Acceder al dashboard con funcionalidades completas

### 4. Gestión de Usuarios (Admin)
- Crear nuevos usuarios desde "Enrolar usuario"
- Ver y gestionar asistencias en las tablas
- Exportar reportes a CSV
- Filtrar por fecha y buscar usuarios

## 🧪 Testing

El proyecto incluye configuración para testing con Jest:

```bash
# Ejecutar tests del frontend
cd frontend
pnpm test

# Ejecutar tests en modo watch
pnpm test --watch
```

## 🔧 API Endpoints

### Autenticación
- `POST /api/auth` - Login de usuario

### Usuarios
- `GET /api/users` - Listar todos los usuarios
- `POST /api/users` - Crear nuevo usuario
- `PATCH /api/users` - Actualizar usuario
- `DELETE /api/users/[rut]` - Eliminar usuario
- `GET /api/users/exists/[rut]` - Verificar existencia de usuario
- `POST /api/users/exists` - Verificar existencia por email

### Asistencias
- `GET /api/attendances` - Listar asistencias
- `POST /api/attendances` - Crear nueva asistencia
- `POST /api/attendances/checking` - Validar credenciales para marcaje

## 🎨 Características de UI/UX

- **Diseño responsivo** con Bulma CSS
- **Interfaz intuitiva** con navegación clara
- **Sistema de alertas** para feedback del usuario
- **Componentes reutilizables** y modulares
- **Tipografía moderna** con fuentes Geist
- **Iconografía consistente** con iconos personalizados

## 🔒 Seguridad

- **Encriptación de contraseñas** con bcryptjs
- **Validación de esquemas** con Valibot
- **Manejo de errores** robusto
- **CORS configurado** para seguridad
- **Autenticación JWT** para sesiones seguras

## 🚀 Mejoras Sugeridas

### Funcionalidades
- [ ] **Notificaciones push** para recordatorios de marcaje
- [ ] **Reportes avanzados** con gráficos y estadísticas
- [ ] **Integración con calendario** para días festivos
- [ ] **Sistema de permisos** más granular
- [ ] **Backup automático** de la base de datos
- [ ] **API REST completa** con documentación Swagger
- [ ] **Sistema de auditoría** para cambios importantes

### Técnicas
- [ ] **Tests unitarios** más completos
- [ ] **Tests de integración** para APIs
- [ ] **Dockerización** para despliegue fácil
- [ ] **CI/CD pipeline** con GitHub Actions
- [ ] **Monitoreo y logging** avanzado
- [ ] **Optimización de rendimiento** con caching
- [ ] **PWA** para uso móvil offline

### UI/UX
- [ ] **Tema oscuro/claro** configurable
- [ ] **Internacionalización** (i18n)
- [ ] **Accesibilidad** mejorada (WCAG)
- [ ] **Animaciones** y transiciones suaves
- [ ] **Dashboard con métricas** en tiempo real

## 🤝 Contribución

Para contribuir al proyecto, sigue las pautas establecidas en [CONTRIBUTING.md](CONTRIBUTING.md):

1. Fork del repositorio
2. Crear rama para la nueva funcionalidad
3. Realizar cambios y tests
4. Crear Pull Request

### Convención de Commits
- `feat:` - Nueva funcionalidad
- `fix:` - Corrección de bugs
- `docs:` - Cambios en documentación
- `refactor:` - Refactorización de código
- `BREAKING CHANGE:` - Cambios que rompen compatibilidad

## 📄 Licencia

Este proyecto está bajo la Licencia ISC. Ver el archivo de licencia para más detalles.

## 👨‍💻 Autor

Proyecto desarrollado como trabajo final de título para la Ingeniería en Computación e Informática.

## 📞 Soporte

Para soporte técnico o consultas sobre el proyecto, por favor crear un issue en el repositorio.
