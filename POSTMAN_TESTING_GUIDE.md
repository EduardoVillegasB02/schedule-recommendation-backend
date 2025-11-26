# Guía de Pruebas con Postman - Todos los Endpoints

Esta guía documenta TODOS los endpoints del sistema, organizados por módulos.

## Configuración Inicial

### Base URL
```
http://localhost:3003/api
```

### Headers Requeridos
Para endpoints protegidos (que requieren autenticación):
```
Authorization: Bearer <tu_token_jwt>
Content-Type: application/json
```

---

## 🚀 INICIO RÁPIDO

### Endpoints Principales (sin localhost). Antes http://localhost:3003/api

| Módulo | Método | Endpoint | Requiere Auth | Rol |
|--------|--------|----------|---------------|-----|
| **Autenticación** |
| Login | POST | `/auth/login` | ❌ | - |
| Logout | POST | `/auth/logout` | ✅ | Todos |
| Profile | GET | `/auth/profile` | ✅ | Todos |
| Change Password | PATCH | `/auth/change-password` | ✅ | Todos |
| **Dashboard (NUEVO)** |
| Mi Dashboard | GET | `/dashboard/me` | ✅ | Todos |
| Dashboard Alumno | GET | `/dashboard/alumno` | ✅ | ALUMNO, ADMIN |
| Dashboard Profesor | GET | `/dashboard/profesor` | ✅ | PROFESOR, ADMIN |
| Dashboard Admin | GET | `/dashboard/admin` | ✅ | ADMIN |
| **Búsqueda Avanzada (NUEVO)** |
| Buscar Alumnos | GET | `/alumno/search/advanced` | ✅ | Todos |
| Buscar Profesores | GET | `/profesor/search/advanced` | ✅ | Todos |
| **Carga Masiva (NUEVO)** |
| Upload Alumnos CSV | POST | `/alumno/upload` | ✅ | ADMIN |
| Upload Ofertados CSV | POST | `/ofertado/upload` | ✅ | ADMIN |
| **Registro (ADMIN)** |
| Register User | POST | `/auth/register` | ✅ | ADMIN |
| Register Admin | POST | `/auth/register/admin` | ✅ | ADMIN |
| Register Alumno | POST | `/auth/register/alumno` | ✅ | ADMIN |
| Register Profesor | POST | `/auth/register/profesor` | ✅ | ADMIN |
| **Gestión Usuarios** |
| List Users | GET | `/users` | ✅ | ADMIN |
| Get User | GET | `/users/:id` | ✅ | ADMIN |
| Update User | PATCH | `/users/:id` | ✅ | ADMIN |
| Delete User | DELETE | `/users/:id` | ✅ | ADMIN |
| **Alumnos** |
| List | GET | `/alumno` | ✅ | Todos |
| Get | GET | `/alumno/:id` | ✅ | Todos |
| Create | POST | `/alumno` | ✅ | ADMIN |
| Update | PATCH | `/alumno/:id` | ✅ | ADMIN |
| Delete | DELETE | `/alumno/:id` | ✅ | ADMIN |
| **Profesores** |
| List | GET | `/profesor` | ✅ | Todos |
| Get | GET | `/profesor/:id` | ✅ | Todos |
| Create | POST | `/profesor` | ✅ | ADMIN |
| Update | PATCH | `/profesor/:id` | ✅ | ADMIN |
| Delete | DELETE | `/profesor/:id` | ✅ | ADMIN |
| **Cursos** |
| List | GET | `/curso` | ✅ | Todos |
| Get | GET | `/curso/:id` | ✅ | Todos |
| Create | POST | `/curso` | ✅ | ADMIN |
| Update | PATCH | `/curso/:id` | ✅ | ADMIN |
| Delete | DELETE | `/curso/:id` | ✅ | ADMIN |
| **Cursos Ofertados** |
| List | GET | `/ofertado` | ✅ | Todos |
| Get | GET | `/ofertado/:id` | ✅ | Todos |
| Create | POST | `/ofertado` | ✅ | ADMIN |
| Update | PATCH | `/ofertado/:id` | ✅ | ADMIN |
| Delete | DELETE | `/ofertado/:id` | ✅ | ADMIN |
| **Matrículas** |
| List | GET | `/matricula` | ✅ | Todos |
| Get | GET | `/matricula/:id` | ✅ | Todos |
| Create | POST | `/matricula` | ✅ | ADMIN |
| Update | PATCH | `/matricula/:id` | ✅ | ADMIN |
| Delete | DELETE | `/matricula/:id` | ✅ | ADMIN |
| **Demanda** |
| List | GET | `/demanda` | ✅ | Todos |
| Get | GET | `/demanda/:id` | ✅ | Todos |
| Create | POST | `/demanda` | ✅ | ADMIN |
| Update | PATCH | `/demanda/:id` | ✅ | ADMIN |
| Delete | DELETE | `/demanda/:id` | ✅ | ADMIN |
| **Créditos** |
| List | GET | `/credito` | ✅ | Todos |
| Get | GET | `/credito/:id` | ✅ | Todos |
| Create | POST | `/credito` | ✅ | ADMIN |
| Update | PATCH | `/credito/:id` | ✅ | ADMIN |
| Delete | DELETE | `/credito/:id` | ✅ | ADMIN |
| **Requisitos** |
| List | GET | `/requisito` | ✅ | Todos |
| Get | GET | `/requisito/:id` | ✅ | Todos |
| Create | POST | `/requisito` | ✅ | ADMIN |
| Update | PATCH | `/requisito/:id` | ✅ | ADMIN |
| Delete | DELETE | `/requisito/:id` | ✅ | ADMIN |
| **Ciclo Relativo** |
| List | GET | `/relativo` | ✅ | Todos |
| Get | GET | `/relativo/:id` | ✅ | Todos |
| Create | POST | `/relativo` | ✅ | ADMIN |
| Update | PATCH | `/relativo/:id` | ✅ | ADMIN |
| Delete | DELETE | `/relativo/:id` | ✅ | ADMIN |

**Nota:** Todos los endpoints se deben usar con la base URL: `http://localhost:3003/api`

---

## 📋 ÍNDICE DE MÓDULOS

1. [Autenticación](#1-autenticación)
2. [Registro de Usuarios](#2-registro-de-usuarios-solo-admin)
3. [Perfil de Usuario](#3-perfil-de-usuario)
4. [Gestión de Usuarios](#4-gestión-de-usuarios-admin)
5. [Dashboard](#5-dashboard-nuevo)
6. [Alumnos](#6-alumnos)
7. [Profesores](#7-profesores)
8. [Cursos](#8-cursos)
9. [Cursos Ofertados](#9-cursos-ofertados)
10. [Matrículas](#10-matrículas)
11. [Demanda](#11-demanda)
12. [Créditos](#12-créditos)
13. [Requisitos](#13-requisitos)
14. [Ciclo Relativo](#14-ciclo-relativo)

---

## 1. AUTENTICACIÓN

### 1.1 Login
Iniciar sesión y obtener token JWT.

**Endpoint:** `POST /auth/login`

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "email": "admin@uni.edu.pe",
  "password": "admin123"
}
```

**Respuesta Exitosa (200):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "admin@uni.edu.pe",
    "rol": "ADMIN",
    "alumno": null,
    "profesor": null
  }
}
```

**Errores:**
- 401: Credenciales inválidas

---

### 1.2 Logout
Cerrar sesión (requiere autenticación).

**Endpoint:** `POST /auth/logout`

**Headers:**
```
Authorization: Bearer <tu_token_jwt>
Content-Type: application/json
```

**Body:** Ninguno (vacío)

**Respuesta Exitosa (200):**
```json
{
  "message": "Logout exitoso"
}
```

---

## 2. REGISTRO DE USUARIOS (Solo ADMIN)

Todos los endpoints de registro requieren autenticación y rol ADMIN.

### 2.1 Registrar Usuario para Alumno/Profesor Existente
Vincular un usuario a un alumno o profesor que ya existe en la base de datos.

**Endpoint:** `POST /auth/register`

**Headers:**
```
Authorization: Bearer <token_admin>
Content-Type: application/json
```

**Body - Opción A (vincular por ID):**
```json
{
  "email": "juan.perez@uni.edu.pe",
  "password": "alumno123",
  "rol": "ALUMNO",
  "alumno_id": 123
}
```

**Body - Opción B (vincular por código de alumno):**
```json
{
  "email": "maria.gonzalez@uni.edu.pe",
  "password": "alumno123",
  "rol": "ALUMNO",
  "codigo": "20201234A"
}
```

**Body - Opción C (vincular por código de profesor):**
```json
{
  "email": "carlos.lopez@uni.edu.pe",
  "password": "profesor123",
  "rol": "PROFESOR",
  "codigo_profesor": "PROF001"
}
```

**Respuesta Exitosa (201):**
```json
{
  "message": "Usuario registrado exitosamente",
  "user": {
    "id": 4,
    "email": "juan.perez@uni.edu.pe",
    "rol": "ALUMNO",
    "alumno": {
      "id": 123,
      "codigo": "20201234A",
      "nombres": "Juan",
      "apellidos": "Pérez García"
    }
  }
}
```

**Errores:**
- 400: Debe proporcionar alumno_id/codigo o profesor_id/codigo_profesor
- 404: Alumno/Profesor no encontrado
- 409: Email ya registrado / Alumno/Profesor ya tiene usuario
- 401: No autorizado (requiere token ADMIN)

---

### 2.2 Registrar Usuario Admin
Crear un nuevo usuario con rol ADMIN.

**Endpoint:** `POST /auth/register/admin`

**Headers:**
```
Authorization: Bearer <token_admin>
Content-Type: application/json
```

**Body:**
```json
{
  "email": "nuevo.admin@uni.edu.pe",
  "password": "admin456"
}
```

**Respuesta Exitosa (201):**
```json
{
  "message": "Usuario admin registrado exitosamente",
  "user": {
    "id": 5,
    "email": "nuevo.admin@uni.edu.pe",
    "rol": "ADMIN"
  }
}
```

**Errores:**
- 409: Email ya registrado
- 401: No autorizado (requiere token ADMIN)

---

### 2.3 Registrar Alumno + Usuario
Crear un nuevo alumno y su usuario asociado en una sola operación.

**Endpoint:** `POST /auth/register/alumno`

**Headers:**
```
Authorization: Bearer <token_admin>
Content-Type: application/json
```

**Body:**
```json
{
  "email": "gabriel.ferre.c@uni.edu.pe",
  "password": "alumno123",
  "codigo": "20203456B",
  "nombres": "Gabriel",
  "apellidos": "Ferré Cruz",
  "ciclo_relativo": 6,
  "creditos_aprobados": 120,
  "promedio": 14.5,
  "estado": "REGULAR"
}
```

**Respuesta Exitosa (201):**
```json
{
  "message": "Alumno y usuario creados exitosamente",
  "user": {
    "id": 6,
    "email": "gabriel.ferre.c@uni.edu.pe",
    "rol": "ALUMNO",
    "alumno": {
      "id": 504,
      "codigo": "20203456B",
      "nombres": "Gabriel",
      "apellidos": "Ferré Cruz",
      "ciclo_relativo": 6,
      "creditos_aprobados": 120,
      "promedio": 14.5,
      "estado": "REGULAR"
    }
  }
}
```

**Errores:**
- 409: Email o código ya registrado
- 401: No autorizado (requiere token ADMIN)

---

### 2.4 Registrar Profesor + Usuario
Crear un nuevo profesor y su usuario asociado en una sola operación.

**Endpoint:** `POST /auth/register/profesor`

**Headers:**
```
Authorization: Bearer <token_admin>
Content-Type: application/json
```

**Body:**
```json
{
  "email": "ana.torres@uni.edu.pe",
  "password": "profesor123",
  "nombre": "Ana Torres Vargas",
  "codigo_profesor": "PROF123",
  "experiencia_anios": 10,
  "popularidad": 4.5
}
```

**Respuesta Exitosa (201):**
```json
{
  "message": "Profesor y usuario creados exitosamente",
  "user": {
    "id": 7,
    "email": "ana.torres@uni.edu.pe",
    "rol": "PROFESOR",
    "profesor": {
      "id": 93,
      "codigo_profesor": "PROF123",
      "nombre": "Ana Torres Vargas",
      "experiencia_anios": 10,
      "popularidad": 4.5
    }
  }
}
```

**Errores:**
- 409: Email o código_profesor ya registrado
- 401: No autorizado (requiere token ADMIN)

---

## 3. PERFIL DE USUARIO (Autenticado)

Endpoints para que cualquier usuario autenticado gestione su propio perfil.

### 3.1 Obtener Perfil Actual
Obtener información del usuario autenticado.

**Endpoint:** `GET /auth/profile`

**Headers:**
```
Authorization: Bearer <tu_token_jwt>
```

**Body:** Ninguno

**Respuesta Exitosa (200):**
```json
{
  "id": 1,
  "email": "admin@uni.edu.pe",
  "rol": "ADMIN",
  "alumno": null,
  "profesor": null
}
```

**Errores:**
- 401: Token inválido o expirado

---

### 3.2 Actualizar Perfil Actual
Actualizar el email del usuario autenticado.

**Endpoint:** `PATCH /auth/profile`

**Headers:**
```
Authorization: Bearer <tu_token_jwt>
Content-Type: application/json
```

**Body:**
```json
{
  "email": "nuevo.email@uni.edu.pe"
}
```

**Respuesta Exitosa (200):**
```json
{
  "id": 1,
  "email": "nuevo.email@uni.edu.pe",
  "rol": "ADMIN",
  "alumno": null,
  "profesor": null
}
```

**Errores:**
- 409: Email ya registrado por otro usuario
- 401: Token inválido o expirado

---

### 3.3 Cambiar Contraseña
Cambiar la contraseña del usuario autenticado.

**Endpoint:** `PATCH /auth/change-password`

**Headers:**
```
Authorization: Bearer <tu_token_jwt>
Content-Type: application/json
```

**Body:**
```json
{
  "currentPassword": "admin123",
  "newPassword": "nuevaContraseña456"
}
```

**Respuesta Exitosa (200):**
```json
{
  "message": "Contraseña actualizada exitosamente"
}
```

**Errores:**
- 401: Contraseña actual incorrecta
- 401: Token inválido o expirado
- 400: Nueva contraseña debe tener al menos 6 caracteres

---

## 4. GESTIÓN DE USUARIOS (Solo ADMIN)

Endpoints para administradores para gestionar todos los usuarios del sistema.

### 4.1 Listar Todos los Usuarios
Obtener lista de todos los usuarios del sistema.

**Endpoint:** `GET /users`

**Headers:**
```
Authorization: Bearer <token_admin>
```

**Body:** Ninguno

**Respuesta Exitosa (200):**
```json
[
  {
    "id": 1,
    "email": "admin@uni.edu.pe",
    "rol": "ADMIN",
    "alumno_id": null,
    "profesor_id": null,
    "alumno": null,
    "profesor": null
  },
  {
    "id": 2,
    "email": "juan.perez@uni.edu.pe",
    "rol": "ALUMNO",
    "alumno_id": 123,
    "profesor_id": null,
    "alumno": {
      "id": 123,
      "codigo": "20201234A",
      "nombres": "Juan",
      "apellidos": "Pérez García"
    },
    "profesor": null
  }
]
```

**Errores:**
- 401: No autorizado (requiere token ADMIN)

---

### 4.2 Obtener Usuario por ID
Obtener información de un usuario específico.

**Endpoint:** `GET /users/:id`

**Headers:**
```
Authorization: Bearer <token_admin>
```

**Ejemplo:** `GET /users/2`

**Body:** Ninguno

**Respuesta Exitosa (200):**
```json
{
  "id": 2,
  "email": "juan.perez@uni.edu.pe",
  "rol": "ALUMNO",
  "alumno_id": 123,
  "profesor_id": null,
  "alumno": {
    "id": 123,
    "codigo": "20201234A",
    "nombres": "Juan",
    "apellidos": "Pérez García"
  },
  "profesor": null
}
```

**Errores:**
- 404: Usuario no encontrado
- 401: No autorizado (requiere token ADMIN)

---

### 4.3 Actualizar Usuario
Actualizar información de un usuario (email, rol, relaciones).

**Endpoint:** `PATCH /users/:id`

**Headers:**
```
Authorization: Bearer <token_admin>
Content-Type: application/json
```

**Ejemplo:** `PATCH /users/2`

**Body:**
```json
{
  "email": "juan.perez.nuevo@uni.edu.pe",
  "rol": "ALUMNO"
}
```

**Respuesta Exitosa (200):**
```json
{
  "id": 2,
  "email": "juan.perez.nuevo@uni.edu.pe",
  "rol": "ALUMNO",
  "alumno_id": 123,
  "profesor_id": null,
  "alumno": {
    "id": 123,
    "codigo": "20201234A",
    "nombres": "Juan",
    "apellidos": "Pérez García"
  },
  "profesor": null
}
```

**Errores:**
- 404: Usuario no encontrado
- 409: Email ya registrado por otro usuario
- 401: No autorizado (requiere token ADMIN)

---

### 4.4 Eliminar Usuario
Eliminar un usuario del sistema.

**Endpoint:** `DELETE /users/:id`

**Headers:**
```
Authorization: Bearer <token_admin>
```

**Ejemplo:** `DELETE /users/2`

**Body:** Ninguno

**Respuesta Exitosa (200):**
```json
{
  "message": "Usuario eliminado exitosamente"
}
```

**Errores:**
- 404: Usuario no encontrado
- 401: No autorizado (requiere token ADMIN)

---

## 5. FLUJO DE PRUEBA COMPLETO

### Paso 1: Login como Admin
```
POST /auth/login
Body:
{
  "email": "admin@uni.edu.pe",
  "password": "admin123"
}

Guardar el access_token de la respuesta.
```

### Paso 2: Crear un Alumno + Usuario
```
POST /auth/register/alumno
Headers: Authorization: Bearer <token_admin>
Body:
{
  "email": "test.alumno@uni.edu.pe",
  "password": "test123",
  "codigo": "20240001X",
  "nombres": "Test",
  "apellidos": "Alumno Prueba",
  "ciclo_relativo": 1,
  "creditos_aprobados": 0,
  "promedio": 0,
  "estado": "REGULAR"
}
```

### Paso 3: Login como el Nuevo Alumno
```
POST /auth/login
Body:
{
  "email": "test.alumno@uni.edu.pe",
  "password": "test123"
}

Guardar el nuevo access_token.
```

### Paso 4: Ver Perfil
```
GET /auth/profile
Headers: Authorization: Bearer <token_alumno>
```

### Paso 5: Cambiar Contraseña
```
PATCH /auth/change-password
Headers: Authorization: Bearer <token_alumno>
Body:
{
  "currentPassword": "test123",
  "newPassword": "nuevaPassword456"
}
```

### Paso 6: Listar Usuarios (como Admin)
```
GET /users
Headers: Authorization: Bearer <token_admin>
```

### Paso 7: Eliminar Usuario (como Admin)
```
DELETE /users/{id_del_usuario_test}
Headers: Authorization: Bearer <token_admin>
```

---

## 5. DASHBOARD (NUEVO)

Endpoints para obtener estadísticas según rol de usuario.

### 5.1 Obtener Mi Dashboard
Dashboard automático según el rol del usuario autenticado.

**Endpoint:** `GET /dashboard/me`

**Headers:**
```
Authorization: Bearer <tu_token>
```

**Respuesta para ALUMNO (200):**
```json
{
  "alumno": {
    "id": 504,
    "codigo": "20200123",
    "nombres": "Juan",
    "apellidos": "Pérez",
    "ciclo_relativo": 5,
    "estado": "activo"
  },
  "creditos": {
    "aprobados": 120,
    "promedio": 14.5
  },
  "estadisticas": {
    "total_cursos": 25,
    "aprobados": 20,
    "desaprobados": 3,
    "en_curso": 2,
    "tasa_aprobacion": 80
  },
  "semestre_actual": {
    "semestre": "2024-2",
    "cursos": [
      {
        "curso_codigo": "MB536",
        "curso_nombre": "Ingeniería de Software",
        "creditos": 4,
        "profesor": "Dr. García",
        "seccion": "A",
        "turno": "M",
        "estado": "matriculado"
      }
    ],
    "total_creditos": 18
  }
}
```

**Respuesta para PROFESOR (200):**
```json
{
  "profesor": {
    "id": 12,
    "codigo_profesor": "P001",
    "nombre": "Dr. García",
    "experiencia_anios": 15,
    "popularidad": 4.8
  },
  "estadisticas": {
    "total_cursos_ofertados": 45,
    "cursos_distintos": 8,
    "total_alumnos": 890,
    "promedio_alumnos_por_curso": 19.78
  },
  "semestre_actual": {
    "semestre": "2024-2",
    "cursos": [
      {
        "curso_codigo": "MB536",
        "curso_nombre": "Ingeniería de Software",
        "seccion": "A",
        "cupos_disponibles": 25,
        "alumnos_matriculados": 22,
        "ocupacion": 88,
        "turno": "M",
        "alumnos": [
          {
            "codigo": "20200123",
            "nombre": "Juan Pérez",
            "estado": "matriculado"
          }
        ]
      }
    ]
  }
}
```

**Respuesta para ADMIN (200):**
```json
{
  "resumen": {
    "total_alumnos": 1500,
    "total_profesores": 120,
    "total_cursos": 250,
    "total_usuarios": 450
  },
  "semestre_actual": {
    "semestre": "2024-2",
    "cursos_ofertados": 180,
    "total_matriculas": 3200,
    "promedio_matriculas_por_curso": 17.78
  },
  "estadisticas_matricula": [
    { "estado": "matriculado", "cantidad": 2800 },
    { "estado": "aprobado", "cantidad": 2500 },
    { "estado": "desaprobado", "cantidad": 400 }
  ],
  "top_cursos_demanda": [
    {
      "curso_codigo": "MB536",
      "curso_nombre": "Ingeniería de Software",
      "profesor": "Dr. García",
      "seccion": "A",
      "matriculados": 25,
      "vacantes": 25
    }
  ],
  "distribucion_ciclos": [
    { "ciclo": 1, "alumnos": 250 },
    { "ciclo": 2, "alumnos": 230 }
  ],
  "rendimiento": {
    "promedio_general": 13.8
  }
}
```

---

### 5.2 Dashboard de Alumno
Obtener dashboard de un alumno específico (ALUMNO ve el suyo, ADMIN puede ver cualquiera).

**Endpoint:** `GET /dashboard/alumno`

**Headers:**
```
Authorization: Bearer <tu_token>
```

**Acceso:**
- ALUMNO: Ve su propio dashboard
- ADMIN: Debe especificar `alumno_id` como query param (por implementar)

---

### 5.3 Dashboard de Profesor
Obtener dashboard de un profesor específico.

**Endpoint:** `GET /dashboard/profesor`

**Headers:**
```
Authorization: Bearer <tu_token>
```

**Acceso:**
- PROFESOR: Ve su propio dashboard
- ADMIN: Debe especificar `profesor_id` como query param (por implementar)

---

### 5.4 Dashboard Administrativo
Estadísticas globales del sistema (solo ADMIN).

**Endpoint:** `GET /dashboard/admin`

**Headers:**
```
Authorization: Bearer <token_admin>
```

---

## 6. ALUMNOS

### 6.1 Listar Todos los Alumnos
**Endpoint:** `GET /alumno`

**Headers:**
```
Authorization: Bearer <tu_token>
```

**Respuesta (200):**
```json
[
  {
    "id": 504,
    "codigo": "20200123",
    "nombres": "Juan",
    "apellidos": "Pérez",
    "promedio": "14.50",
    "ciclo_relativo": 5,
    "creditos_aprobados": 120,
    "estado": "activo"
  }
]
```

---

### 6.2 Buscar Alumno por ID
**Endpoint:** `GET /alumno/:id`

**Headers:**
```
Authorization: Bearer <tu_token>
```

**Ejemplo:** `GET /alumno/504`

---

### 6.3 Búsqueda Avanzada de Alumnos (NUEVO)
Buscar alumnos con múltiples filtros.

**Endpoint:** `GET /alumno/search/advanced`

**Headers:**
```
Authorization: Bearer <tu_token>
```

**Query Parameters (todos opcionales):**
```
codigo: 20200123
nombres: Juan
apellidos: Pérez
ciclo_min: 3
ciclo_max: 6
estado: activo
promedio_min: 13.0
promedio_max: 18.0
```

**Ejemplo completo:**
```
GET /alumno/search/advanced?ciclo_min=4&promedio_min=14&estado=activo
```

**Respuesta (200):**
```json
[
  {
    "id": 504,
    "codigo": "20200123",
    "nombres": "Juan",
    "apellidos": "Pérez",
    "promedio": "14.50",
    "ciclo_relativo": 5,
    "creditos_aprobados": 120,
    "estado": "activo"
  }
]
```

**Límite:** Máximo 100 resultados

---

### 6.4 Crear Alumno
**Endpoint:** `POST /alumno`

**Headers:**
```
Authorization: Bearer <tu_token>
```

**Body:**
```json
{
  "codigo": "20250001",
  "nombres": "María",
  "apellidos": "González",
  "promedio": 15.0,
  "ciclo_relativo": 1,
  "creditos_aprobados": 0,
  "estado": "activo"
}
```

---

### 6.5 Actualizar Alumno
**Endpoint:** `PATCH /alumno/:id`

**Headers:**
```
Authorization: Bearer <tu_token>
```

**Body (campos opcionales):**
```json
{
  "promedio": 15.5,
  "ciclo_relativo": 2,
  "creditos_aprobados": 20
}
```

---

### 6.6 Eliminar Alumno
**Endpoint:** `DELETE /alumno/:id`

**Headers:**
```
Authorization: Bearer <tu_token>
```

---

### 6.7 Carga Masiva CSV (ADMIN)
**Endpoint:** `POST /alumno/upload`

**Headers:**
```
Authorization: Bearer <token_admin>
Content-Type: multipart/form-data
```

**Form Data:**
```
file: <archivo.csv>
```

**Formato CSV:**
```csv
codigo,nombres,apellidos,promedio,ciclo_relativo,creditos_aprobados,estado
20250001,María,González,15.0,1,0,activo
20250002,Pedro,Ramírez,14.5,1,0,activo
```

---

## 7. PROFESORES

### 7.1 Listar Todos los Profesores
**Endpoint:** `GET /profesor`

**Headers:**
```
Authorization: Bearer <tu_token>
```

---

### 7.2 Buscar Profesor por ID
**Endpoint:** `GET /profesor/:id`

**Headers:**
```
Authorization: Bearer <tu_token>
```

---

### 7.3 Búsqueda Avanzada de Profesores (NUEVO)
**Endpoint:** `GET /profesor/search/advanced`

**Headers:**
```
Authorization: Bearer <tu_token>
```

**Query Parameters (todos opcionales):**
```
codigo_profesor: P001
nombre: García
experiencia_min: 5
experiencia_max: 20
popularidad_min: 4.0
```

**Ejemplo:**
```
GET /profesor/search/advanced?experiencia_min=10&popularidad_min=4.5
```

**Límite:** Máximo 100 resultados

---

### 7.4 Crear Profesor
**Endpoint:** `POST /profesor`

**Headers:**
```
Authorization: Bearer <tu_token>
```

**Body:**
```json
{
  "codigo_profesor": "P150",
  "nombre": "Dr. José Ramírez",
  "experiencia_anios": 12,
  "popularidad": 4.6
}
```

---

### 7.5 Actualizar Profesor
**Endpoint:** `PATCH /profesor/:id`

---

### 7.6 Eliminar Profesor
**Endpoint:** `DELETE /profesor/:id`

---

## 8. CURSOS

### 8.1 Listar Todos los Cursos
**Endpoint:** `GET /curso`

**Headers:**
```
Authorization: Bearer <tu_token>
```

---

### 8.2 Buscar Curso por ID
**Endpoint:** `GET /curso/:id`

---

### 8.3 Crear Curso
**Endpoint:** `POST /curso`

**Body:**
```json
{
  "codigo": "MB536",
  "nombre": "Ingeniería de Software",
  "tipo": "obligatorio",
  "ciclo": 8,
  "sistema_eval": "T",
  "ht": 3,
  "hp": 2,
  "hl": 0,
  "creditos": 4
}
```

---

### 8.4 Actualizar Curso
**Endpoint:** `PATCH /curso/:id`

---

### 8.5 Eliminar Curso
**Endpoint:** `DELETE /curso/:id`

---

## 9. CURSOS OFERTADOS

### 9.1 Listar Cursos Ofertados
**Endpoint:** `GET /ofertado`

**Headers:**
```
Authorization: Bearer <tu_token>
```

---

### 9.2 Buscar Curso Ofertado por ID
**Endpoint:** `GET /ofertado/:id`

---

### 9.3 Crear Curso Ofertado
**Endpoint:** `POST /ofertado`

**Body:**
```json
{
  "curso_id": 1,
  "profesor_id": 5,
  "semestre": "2024-2",
  "codigo_seccion": "A",
  "turno": "M",
  "cupos_disponibles": 25
}
```

---

### 9.4 Actualizar Curso Ofertado
**Endpoint:** `PATCH /ofertado/:id`

---

### 9.5 Eliminar Curso Ofertado
**Endpoint:** `DELETE /ofertado/:id`

---

### 9.6 Carga Masiva CSV (ADMIN) (NUEVO)
**Endpoint:** `POST /ofertado/upload`

**Headers:**
```
Authorization: Bearer <token_admin>
Content-Type: multipart/form-data
```

**Form Data:**
```
file: <archivo.csv o .xlsx>
```

**Formato CSV:**
```csv
codigo_curso,codigo_profesor,semestre,seccion,vacantes,turno
MB536,P001,2024-2,A,25,M
MB537,P002,2024-2,B,30,T
```

**Respuesta (200):**
```json
{
  "message": "Carga masiva completada",
  "created": 15,
  "errors": [
    {
      "row": { "codigo_curso": "XX999" },
      "error": "Curso con código XX999 no encontrado"
    }
  ]
}
```

---

## 10. MATRÍCULAS

### 10.1 Listar Matrículas
**Endpoint:** `GET /matricula`

---

### 10.2 Buscar Matrícula por ID
**Endpoint:** `GET /matricula/:id`

---

### 10.3 Crear Matrícula
**Endpoint:** `POST /matricula`

**Body:**
```json
{
  "alumno_id": 504,
  "curso_ofertado_id": 120,
  "estado": "matriculado"
}
```

---

### 10.4 Actualizar Matrícula
**Endpoint:** `PATCH /matricula/:id`

**Body:**
```json
{
  "estado": "aprobado",
  "nota_final": 16
}
```

---

### 10.5 Eliminar Matrícula
**Endpoint:** `DELETE /matricula/:id`

---

## 11. DEMANDA

### 11.1 Listar Historial de Demanda
**Endpoint:** `GET /demanda`

---

### 11.2 Buscar Demanda por ID
**Endpoint:** `GET /demanda/:id`

---

### 11.3 Crear Registro de Demanda
**Endpoint:** `POST /demanda`

**Body:**
```json
{
  "curso_id": 1,
  "semestre": "2024-2",
  "demanda_predicha": 85,
  "demanda_real": 90
}
```

---

### 11.4 Actualizar Demanda
**Endpoint:** `PATCH /demanda/:id`

---

### 11.5 Eliminar Demanda
**Endpoint:** `DELETE /demanda/:id`

---

## 12. CRÉDITOS

### 12.1 Listar Log de Créditos
**Endpoint:** `GET /credito`

---

### 12.2 Buscar Crédito por ID
**Endpoint:** `GET /credito/:id`

---

### 12.3 Crear Log de Crédito
**Endpoint:** `POST /credito`

**Body:**
```json
{
  "alumno_id": 504,
  "curso_id": 1,
  "creditos": 4,
  "accion": "aprobado"
}
```

---

### 12.4 Actualizar Crédito
**Endpoint:** `PATCH /credito/:id`

---

### 12.5 Eliminar Crédito
**Endpoint:** `DELETE /credito/:id`

---

## 13. REQUISITOS

### 13.1 Listar Requisitos
**Endpoint:** `GET /requisito`

---

### 13.2 Buscar Requisito por ID
**Endpoint:** `GET /requisito/:id`

---

### 13.3 Crear Requisito
**Endpoint:** `POST /requisito`

**Body:**
```json
{
  "curso_id": 10,
  "prerrequisito_id": 5
}
```

---

### 13.4 Actualizar Requisito
**Endpoint:** `PATCH /requisito/:id`

---

### 13.5 Eliminar Requisito
**Endpoint:** `DELETE /requisito/:id`

---

## 14. CICLO RELATIVO

### 14.1 Listar Log de Ciclo Relativo
**Endpoint:** `GET /relativo`

---

### 14.2 Buscar por ID
**Endpoint:** `GET /relativo/:id`

---

### 14.3 Crear Log
**Endpoint:** `POST /relativo`

**Body:**
```json
{
  "alumno_id": 504,
  "ciclo_anterior": 4,
  "ciclo_nuevo": 5,
  "creditos_aprobados": 100
}
```

---

### 14.4 Actualizar
**Endpoint:** `PATCH /relativo/:id`

---

### 14.5 Eliminar
**Endpoint:** `DELETE /relativo/:id`

---

## 15. NOTAS IMPORTANTES

### Sistema de Hashing
El sistema usa **Base64** para las contraseñas:
```
password_hash = Buffer.from(password).toString('base64')
```

### Roles Disponibles
- `ADMIN`: Acceso completo a todo el sistema
- `ALUMNO`: Acceso a funcionalidades de estudiante
- `PROFESOR`: Acceso a funcionalidades de docente

### Guards y Permisos
- **JwtAuthGuard**: Valida que el token JWT sea válido
- **RolesGuard**: Valida que el usuario tenga el rol requerido
- **ADMIN**: Tiene acceso a todos los endpoints (el guard retorna true para ADMIN)

### Tokens JWT
- Los tokens NO se almacenan en la base de datos (stateless)
- Contienen: `sub` (user ID), `email`, `rol`
- Expiran según la configuración del módulo JWT

### Validaciones
- Email: Debe ser válido y único
- Password: Mínimo 6 caracteres
- Código alumno: Debe ser único
- Código profesor: Debe ser único

---

## 16. CONFIGURACIÓN DE POSTMAN

### Paso 1: Crear Colección
1. Abre Postman
2. Clic en "New Collection"
3. Nombre: "Backend API - Sistema UNI"

### Paso 2: Configurar Variables de Entorno
1. Clic en "Environments" → "Create Environment"
2. Nombre: "Local Development"
3. Agregar variables:

| Variable | Initial Value | Current Value |
|----------|--------------|---------------|
| `base_url` | `http://localhost:3003/api` | `http://localhost:3003/api` |
| `token` | (vacío) | (se llenará automáticamente) |
| `admin_token` | (vacío) | (se llenará automáticamente) |
| `alumno_token` | (vacío) | (se llenará automáticamente) |
| `profesor_token` | (vacío) | (se llenará automáticamente) |

4. Guardar y seleccionar el environment

### Paso 3: Organizar Endpoints en Carpetas
Crear carpetas dentro de la colección:
```
Backend API - Sistema UNI/
├── 1. Autenticación
│   ├── Login
│   ├── Logout
│   └── Profile
├── 2. Registro (Admin Only)
│   ├── Register User
│   ├── Register Admin
│   ├── Register Alumno
│   └── Register Profesor
├── 3. Gestión Usuarios (Admin)
│   ├── List Users
│   ├── Get User
│   ├── Update User
│   └── Delete User
├── 4. Dashboard
│   ├── My Dashboard
│   ├── Alumno Dashboard
│   ├── Profesor Dashboard
│   └── Admin Dashboard
├── 5. Alumnos
│   ├── List Alumnos
│   ├── Search Advanced
│   ├── Get Alumno
│   ├── Create Alumno
│   ├── Update Alumno
│   ├── Delete Alumno
│   └── Upload CSV
├── 6. Profesores
│   ├── List Profesores
│   ├── Search Advanced
│   ├── Get Profesor
│   ├── Create Profesor
│   ├── Update Profesor
│   └── Delete Profesor
├── 7. Cursos
├── 8. Cursos Ofertados
│   └── Upload CSV
├── 9. Matrículas
├── 10. Demanda
├── 11. Créditos
├── 12. Requisitos
└── 13. Ciclo Relativo
```

### Paso 4: Configurar Auto-Guardar Tokens
En el endpoint **POST Login**, agregar este script en la pestaña "Tests":

```javascript
// Guardar token automáticamente después del login
if (pm.response.code === 200) {
    const jsonData = pm.response.json();
    const token = jsonData.access_token;
    const rol = jsonData.user.rol;
    
    // Guardar token general
    pm.environment.set("token", token);
    
    // Guardar token específico por rol
    if (rol === "ADMIN") {
        pm.environment.set("admin_token", token);
        console.log("✅ Token de ADMIN guardado");
    } else if (rol === "ALUMNO") {
        pm.environment.set("alumno_token", token);
        console.log("✅ Token de ALUMNO guardado");
    } else if (rol === "PROFESOR") {
        pm.environment.set("profesor_token", token);
        console.log("✅ Token de PROFESOR guardado");
    }
    
    console.log("Usuario:", jsonData.user.email);
    console.log("Rol:", rol);
}
```

### Paso 5: Usar Variables en Requests
En cualquier endpoint, usa las variables así:

**URL:**
```
{{base_url}}/dashboard/me
```

**Header Authorization:**
```
Bearer {{token}}
```

### Paso 6: Crear Request Rápido
Ejemplo para **GET My Dashboard**:

1. **Method:** GET
2. **URL:** `{{base_url}}/dashboard/me`
3. **Headers:**
   - Key: `Authorization`
   - Value: `Bearer {{token}}`
4. **Tests (opcional):**
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response has data", function () {
    const jsonData = pm.response.json();
    pm.expect(jsonData).to.be.an('object');
});
```

### Paso 7: Exportar/Importar Colección
Para compartir con el equipo:
1. Clic derecho en la colección → "Export"
2. Seleccionar "Collection v2.1"
3. Guardar archivo JSON
4. Otros miembros: "Import" → Seleccionar archivo

---

## 17. FLUJO DE PRUEBAS RECOMENDADO

### Para ADMIN:
```
1. POST /auth/login (admin)
   → Guardar token automáticamente

2. GET /dashboard/admin
   → Ver estadísticas globales

3. GET /alumno/search/advanced?ciclo_min=4
   → Buscar alumnos

4. POST /ofertado/upload
   → Subir cursos ofertados CSV

5. GET /users
   → Ver todos los usuarios
```

### Para ALUMNO:
```
1. POST /auth/login (alumno)
   → Guardar token

2. GET /dashboard/me
   → Ver mi dashboard

3. GET /auth/profile
   → Ver mi perfil

4. PATCH /auth/profile
   → Actualizar perfil
```

### Para PROFESOR:
```
1. POST /auth/login (profesor)
   → Guardar token

2. GET /dashboard/me
   → Ver mis cursos y alumnos

3. GET /dashboard/profesor
   → Estadísticas detalladas
```

---

## 18. TIPS Y ATAJOS

### Duplicar Requests Rápidamente
1. Clic derecho en request → "Duplicate"
2. Cambiar solo el nombre y los parámetros necesarios

### Crear Tests Reutilizables
Guarda este snippet en la pestaña "Tests" de requests importantes:

```javascript
// Validar respuesta exitosa
pm.test("Status is 2xx", function () {
    pm.response.to.have.status(200);
});

// Medir tiempo de respuesta
pm.test("Response time < 500ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});

// Validar estructura JSON
pm.test("Response is JSON", function () {
    pm.response.to.be.json;
});
```

### Usar Pre-request Scripts
Para endpoints que requieren datos dinámicos:

```javascript
// Generar timestamp
pm.environment.set("timestamp", new Date().toISOString());

// Generar código aleatorio
const randomCode = "202" + Math.floor(Math.random() * 100000);
pm.environment.set("random_codigo", randomCode);
```

Luego en el Body:
```json
{
  "codigo": "{{random_codigo}}",
  "fecha": "{{timestamp}}"
}
```
