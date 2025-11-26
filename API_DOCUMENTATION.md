# API REST - Backend del Sistema de Horarios UNI

API principal del sistema de recomendación y generación de horarios construida con NestJS, TypeScript y Prisma ORM.

## 🔗 Base URL

```
http://localhost:3003/api
```

## 🔐 Autenticación

La mayoría de endpoints requieren autenticación mediante JWT Bearer Token. Usa el endpoint de login para obtener el token.

**Header requerido:**
```
Authorization: Bearer <tu_token_jwt>
```

---

## 📑 Índice de Endpoints

1. [Autenticación](#autenticación)
2. [Registro de Usuarios](#registro-de-usuarios)
3. [Perfil de Usuario](#perfil-de-usuario)
4. [Gestión de Usuarios](#gestión-de-usuarios)
5. [Dashboard](#dashboard)
6. [Alumnos](#alumnos)
7. [Búsqueda Avanzada](#búsqueda-avanzada)
8. [Profesores](#profesores)
9. [Cursos](#cursos)
10. [Cursos Ofertados](#cursos-ofertados)
11. [Matrículas](#matrículas)
12. [Demanda](#demanda)
13. [Créditos](#créditos)
14. [Requisitos](#requisitos)
15. [Relativos](#relativos)

---

## 🔐 Autenticación

### POST `/auth/login`
Iniciar sesión y obtener token JWT.

**Body:**
```json
{
  "email": "usuario@example.com",
  "password": "contraseña123"
}
```

**Respuesta exitosa (200):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "usuario@example.com",
    "rol": "ALUMNO"
  }
}
```

---

### POST `/auth/logout`
Cerrar sesión (requiere autenticación).

**Headers:**
```
Authorization: Bearer <token>
```

**Respuesta exitosa (200):**
```json
{
  "message": "Sesión cerrada exitosamente"
}
```

---

### POST `/auth/register`
Registrar usuario para alumno/profesor existente (requiere autenticación ADMIN).

**Headers:**
```
Authorization: Bearer <token_admin>
```

**Body (vincular a alumno por ID):**
```json
{
  "email": "alumno@uni.edu.pe",
  "password": "password123",
  "rol": "ALUMNO",
  "alumno_id": 504
}
```

**Body (vincular a alumno por código):**
```json
{
  "email": "alumno@uni.edu.pe",
  "password": "password123",
  "rol": "ALUMNO",
  "codigo": "20200123"
}
```

**Body (vincular a profesor):**
```json
{
  "email": "profesor@uni.edu.pe",
  "password": "password123",
  "rol": "PROFESOR",
  "codigo_profesor": "P123"
}
```

**Respuesta exitosa (201):**
```json
{
  "message": "Usuario creado exitosamente",
  "user": {
    "id": 4,
    "email": "alumno@uni.edu.pe",
    "rol": "ALUMNO",
    "alumno": {
      "id": 504,
      "codigo": "20200123",
      "nombres": "Pedro",
      "apellidos": "López"
    }
  }
}
```

---

### POST `/auth/register/admin`
Registrar nuevo usuario administrador (requiere autenticación ADMIN).

**Headers:**
```
Authorization: Bearer <token_admin>
```

**Body:**
```json
{
  "email": "admin2@uni.edu.pe",
  "password": "admin456"
}
```

**Respuesta exitosa (201):**
```json
{
  "message": "Usuario admin creado exitosamente",
  "user": {
    "id": 5,
    "email": "admin2@uni.edu.pe",
    "rol": "ADMIN"
  }
}
```

---

### POST `/auth/register/alumno`
Registrar nuevo alumno y su usuario (requiere autenticación ADMIN).

**Headers:**
```
Authorization: Bearer <token_admin>
```

**Body:**
```json
{
  "email": "nuevo.alumno@uni.edu.pe",
  "password": "alumno123",
  "codigo": "20241234",
  "nombres": "Pedro",
  "apellidos": "Sánchez García",
  "ciclo_relativo": 1,
  "creditos_aprobados": 0,
  "promedio": 0,
  "estado": "A"
}
```

**Respuesta exitosa (201):**
```json
{
  "message": "Alumno y usuario creados exitosamente",
  "user": {
    "id": 6,
    "email": "nuevo.alumno@uni.edu.pe",
    "rol": "ALUMNO",
    "alumno": {
      "id": 505,
      "codigo": "20241234",
      "nombres": "Pedro",
      "apellidos": "Sánchez García",
      "ciclo_relativo": 1,
      "creditos_aprobados": 0,
      "promedio": 0,
      "estado": "A"
    }
  }
}
```

---

### POST `/auth/register/profesor`
Registrar nuevo profesor y su usuario (requiere autenticación ADMIN).

**Headers:**
```
Authorization: Bearer <token_admin>
```

**Body:**
```json
{
  "email": "nuevo.profesor@uni.edu.pe",
  "password": "profesor123",
  "nombre": "Carlos Rodríguez López",
  "codigo_profesor": "P456",
  "experiencia_anios": 5,
  "popularidad": 0.85
}
```

**Respuesta exitosa (201):**
```json
{
  "message": "Profesor y usuario creados exitosamente",
  "user": {
    "id": 7,
    "email": "nuevo.profesor@uni.edu.pe",
    "rol": "PROFESOR",
    "profesor": {
      "id": 93,
      "nombre": "Carlos Rodríguez López",
      "codigo_profesor": "P456",
      "experiencia_anios": 5,
      "popularidad": 0.85
    }
  }
}
```

**Errores comunes:**

- **409 Conflict** - Email ya registrado
- **409 Conflict** - Código de alumno/profesor ya existe
- **400 Bad Request** - Alumno/profesor no encontrado (cuando se usa código)
- **409 Conflict** - Alumno/profesor ya tiene usuario registrado
- **401 Unauthorized** - Token inválido o no proporcionado
- **403 Forbidden** - Solo ADMIN puede crear usuarios

---

## 👤 Perfil de Usuario

Endpoints para gestionar el perfil del usuario autenticado.

### GET `/auth/profile`
Obtener perfil del usuario actual.

**Headers:**
```
Authorization: Bearer <tu_token>
```

**Respuesta exitosa (200):**
```json
{
  "id": 1,
  "email": "usuario@uni.edu.pe",
  "rol": "ALUMNO",
  "alumno": {
    "id": 504,
    "codigo": "20200123",
    "nombres": "Pedro",
    "apellidos": "López"
  },
  "profesor": null
}
```

---

### PATCH `/auth/profile`
Actualizar email del usuario actual.

**Headers:**
```
Authorization: Bearer <tu_token>
```

**Body:**
```json
{
  "email": "nuevo.email@uni.edu.pe"
}
```

**Respuesta exitosa (200):**
```json
{
  "id": 1,
  "email": "nuevo.email@uni.edu.pe",
  "rol": "ALUMNO",
  "alumno": {
    "id": 504,
    "codigo": "20200123",
    "nombres": "Pedro",
    "apellidos": "López"
  },
  "profesor": null
}
```

**Errores:**
- **409 Conflict** - Email ya registrado por otro usuario

---

### PATCH `/auth/change-password`
Cambiar contraseña del usuario actual.

**Headers:**
```
Authorization: Bearer <tu_token>
```

**Body:**
```json
{
  "currentPassword": "contraseña_actual",
  "newPassword": "nueva_contraseña"
}
```

**Respuesta exitosa (200):**
```json
{
  "message": "Contraseña actualizada exitosamente"
}
```

**Errores:**
- **401 Unauthorized** - Contraseña actual incorrecta
- **400 Bad Request** - Nueva contraseña debe tener al menos 6 caracteres

---

## 👥 Gestión de Usuarios

Endpoints para administradores (ADMIN) para gestionar usuarios del sistema.

### GET `/users`
Listar todos los usuarios (requiere ADMIN).

**Headers:**
```
Authorization: Bearer <token_admin>
```

**Respuesta exitosa (200):**
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
    "email": "alumno@uni.edu.pe",
    "rol": "ALUMNO",
    "alumno_id": 504,
    "profesor_id": null,
    "alumno": {
      "id": 504,
      "codigo": "20200123",
      "nombres": "Pedro",
      "apellidos": "López"
    },
    "profesor": null
  }
]
```

---

### GET `/users/:id`
Obtener usuario por ID (requiere ADMIN).

**Headers:**
```
Authorization: Bearer <token_admin>
```

**Ejemplo:** `GET /users/2`

**Respuesta exitosa (200):**
```json
{
  "id": 2,
  "email": "alumno@uni.edu.pe",
  "rol": "ALUMNO",
  "alumno_id": 504,
  "profesor_id": null,
  "alumno": {
    "id": 504,
    "codigo": "20200123",
    "nombres": "Pedro",
    "apellidos": "López"
  },
  "profesor": null
}
```

**Errores:**
- **404 Not Found** - Usuario no encontrado

---

### PATCH `/users/:id`
Actualizar usuario (requiere ADMIN).

**Headers:**
```
Authorization: Bearer <token_admin>
```

**Ejemplo:** `PATCH /users/2`

**Body:**
```json
{
  "email": "nuevo.email@uni.edu.pe",
  "rol": "PROFESOR",
  "alumno_id": null,
  "profesor_id": 15
}
```

**Respuesta exitosa (200):**
```json
{
  "id": 2,
  "email": "nuevo.email@uni.edu.pe",
  "rol": "PROFESOR",
  "alumno_id": null,
  "profesor_id": 15,
  "alumno": null,
  "profesor": {
    "id": 15,
    "nombre": "Carlos López",
    "codigo_profesor": "P123"
  }
}
```

**Errores:**
- **404 Not Found** - Usuario no encontrado
- **409 Conflict** - Email ya registrado por otro usuario

---

### DELETE `/users/:id`
Eliminar usuario (requiere ADMIN).

**Headers:**
```
Authorization: Bearer <token_admin>
```

**Ejemplo:** `DELETE /users/2`

**Respuesta exitosa (200):**
```json
{
  "message": "Usuario eliminado exitosamente"
}
```

**Errores:**
- **404 Not Found** - Usuario no encontrado

---

## 📊 Dashboard

Endpoints para obtener resúmenes y estadísticas según el rol del usuario.

### GET `/dashboard/me`
Obtener dashboard del usuario actual (detecta rol automáticamente).

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
    "nombres": "Pedro",
    "apellidos": "López",
    "ciclo_relativo": 6,
    "estado": "REGULAR"
  },
  "creditos": {
    "aprobados": 120,
    "promedio": 14.5
  },
  "estadisticas": {
    "total_cursos": 30,
    "aprobados": 28,
    "desaprobados": 2,
    "en_curso": 5,
    "tasa_aprobacion": 93.33
  },
  "semestre_actual": {
    "semestre": "2024-2",
    "cursos": [...],
    "total_creditos": 20
  }
}
```

**Respuesta para PROFESOR (200):**
```json
{
  "profesor": {
    "id": 15,
    "codigo_profesor": "P123",
    "nombre": "Carlos López",
    "experiencia_anios": 10,
    "popularidad": 4.5
  },
  "estadisticas": {
    "total_cursos_ofertados": 25,
    "cursos_distintos": 8,
    "total_alumnos": 500,
    "promedio_alumnos_por_curso": 20
  },
  "semestre_actual": {
    "semestre": "2024-2",
    "cursos": [...]
  }
}
```

**Respuesta para ADMIN (200):**
```json
{
  "resumen": {
    "total_alumnos": 503,
    "total_profesores": 92,
    "total_cursos": 250,
    "total_usuarios": 15
  },
  "semestre_actual": {
    "semestre": "2024-2",
    "cursos_ofertados": 180,
    "total_matriculas": 2500,
    "promedio_matriculas_por_curso": 13.89
  },
  "estadisticas_matricula": [...],
  "top_cursos_demanda": [...],
  "distribucion_ciclos": [...],
  "rendimiento": {
    "promedio_general": 13.2
  }
}
```

---

### GET `/dashboard/alumno`
Dashboard específico para alumnos (ALUMNO ve el suyo, ADMIN puede especificar alumno_id).

**Headers:**
```
Authorization: Bearer <tu_token>
```

---

### GET `/dashboard/profesor`
Dashboard específico para profesores (PROFESOR ve el suyo, ADMIN puede especificar profesor_id).

**Headers:**
```
Authorization: Bearer <tu_token>
```

---

### GET `/dashboard/admin`
Dashboard con estadísticas globales (solo ADMIN).

**Headers:**
```
Authorization: Bearer <token_admin>
```

---

## 👨‍🎓 Alumnos

### POST `/alumno`
Crear nuevo alumno (requiere autenticación).

**Body:**
```json
{
  "codigo": "20200001A",
  "nombres": "Juan Carlos",
  "apellidos": "Pérez García",
  "email": "juan.perez@uni.edu.pe",
  "password": "segura123",
  "facultad": "FIEE"
}
```

**Respuesta exitosa (201):**
```json
{
  "id": 1,
  "codigo": "20200001A",
  "nombres": "Juan Carlos",
  "apellidos": "Pérez García",
  "email": "juan.perez@uni.edu.pe",
  "facultad": "FIEE",
  "createdAt": "2025-11-20T10:30:00.000Z"
}
```

---

### GET `/alumno`
Listar todos los alumnos con búsqueda y paginación (requiere autenticación y rol ALUMNO).

**Query Params:**
- `search` (string, opcional): Texto de búsqueda
- `page` (number, opcional): Número de página (default: 1)
- `limit` (number, opcional): Elementos por página (default: 10)

**Ejemplo:**
```bash
GET /alumno?search=Juan&page=1&limit=10
```

**Respuesta exitosa (200):**
```json
{
  "data": [
    {
      "id": 1,
      "codigo": "20200001A",
      "nombres": "Juan Carlos",
      "apellidos": "Pérez García",
      "email": "juan.perez@uni.edu.pe",
      "facultad": "FIEE"
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 10,
  "totalPages": 1
}
```

---

## 🔍 Búsqueda Avanzada

### GET `/alumno/search/advanced`
Búsqueda avanzada de alumnos con múltiples filtros.

**Query Params:**
- `codigo` (string, opcional): Filtrar por código (búsqueda parcial)
- `nombres` (string, opcional): Filtrar por nombres (búsqueda parcial)
- `apellidos` (string, opcional): Filtrar por apellidos (búsqueda parcial)
- `ciclo_relativo` (number, opcional): Filtrar por ciclo exacto
- `estado` (string, opcional): Filtrar por estado (REGULAR, IRREGULAR, etc.)
- `promedio_min` (number, opcional): Promedio mínimo
- `promedio_max` (number, opcional): Promedio máximo

**Ejemplo:**
```bash
GET /alumno/search/advanced?ciclo_relativo=6&promedio_min=14&estado=REGULAR
```

**Respuesta (200):**
```json
{
  "total": 15,
  "alumnos": [
    {
      "id": 504,
      "codigo": "20200123",
      "nombres": "Pedro",
      "apellidos": "López",
      "ciclo_relativo": 6,
      "promedio": 14.5,
      "estado": "REGULAR"
    }
  ]
}
```

---

### GET `/profesor/search/advanced`
Búsqueda avanzada de profesores con múltiples filtros.

**Query Params:**
- `codigo_profesor` (string, opcional): Filtrar por código (búsqueda parcial)
- `nombre` (string, opcional): Filtrar por nombre (búsqueda parcial)
- `experiencia_min` (number, opcional): Años de experiencia mínimos
- `experiencia_max` (number, opcional): Años de experiencia máximos
- `popularidad_min` (number, opcional): Popularidad mínima

**Ejemplo:**
```bash
GET /profesor/search/advanced?experiencia_min=5&popularidad_min=4.0
```

**Respuesta (200):**
```json
{
  "total": 8,
  "profesores": [
    {
      "id": 15,
      "codigo_profesor": "P123",
      "nombre": "Carlos López",
      "experiencia_anios": 10,
      "popularidad": 4.5
    }
  ]
}
```

---

### GET `/alumno/:id`
Obtener alumno por ID (requiere autenticación).

**Ejemplo:**
```bash
GET /alumno/1
```

**Respuesta exitosa (200):**
```json
{
  "id": 1,
  "codigo": "20200001A",
  "nombres": "Juan Carlos",
  "apellidos": "Pérez García",
  "email": "juan.perez@uni.edu.pe",
  "facultad": "FIEE",
  "matriculas": [],
  "createdAt": "2025-11-20T10:30:00.000Z"
}
```

---

### PATCH `/alumno/:id`
Actualizar alumno por ID (requiere autenticación).

**Body (campos opcionales):**
```json
{
  "nombres": "Juan Pablo",
  "apellidos": "Pérez García",
  "email": "nuevo.email@uni.edu.pe"
}
```

**Respuesta exitosa (200):**
```json
{
  "id": 1,
  "codigo": "20200001A",
  "nombres": "Juan Pablo",
  "apellidos": "Pérez García",
  "email": "nuevo.email@uni.edu.pe",
  "facultad": "FIEE"
}
```

---

### DELETE `/alumno/:id`
Eliminar alumno por ID (requiere autenticación).

**Ejemplo:**
```bash
DELETE /alumno/1
```

**Respuesta exitosa (200):**
```json
{
  "message": "Alumno eliminado exitosamente",
  "id": 1
}
```

---

### POST `/alumno/upload`
Carga masiva de alumnos desde archivo CSV/Excel (requiere autenticación).

**Form Data:**
- `file`: Archivo CSV o Excel

**Respuesta exitosa (201):**
```json
{
  "message": "Carga masiva completada",
  "created": 45,
  "errors": []
}
```

---

## 👨‍🏫 Profesores

### POST `/profesor`
Crear nuevo profesor (requiere autenticación).

**Body:**
```json
{
  "codigo": "P001",
  "nombres": "María Elena",
  "apellidos": "González López",
  "email": "maria.gonzalez@uni.edu.pe",
  "especialidad": "Sistemas Digitales"
}
```

---

### GET `/profesor`
Listar todos los profesores con búsqueda y paginación (requiere autenticación y rol ALUMNO).

**Query Params:**
- `search` (string, opcional): Texto de búsqueda
- `page` (number, opcional): Número de página
- `limit` (number, opcional): Elementos por página

---

### GET `/profesor/:id`
Obtener profesor por ID (requiere autenticación).

---

### PATCH `/profesor/:id`
Actualizar profesor por ID (requiere autenticación).

---

### DELETE `/profesor/:id`
Eliminar profesor por ID (requiere autenticación).

---

## 📚 Cursos

### POST `/curso`
Crear nuevo curso (requiere autenticación).

**Body:**
```json
{
  "codigo": "CIB02",
  "nombre": "Ingeniería de Software",
  "creditos": 4,
  "tipo": "OBLIGATORIO",
  "ciclo": 8,
  "facultad": "FIEE"
}
```

---

### GET `/curso`
Listar todos los cursos con búsqueda y paginación (requiere autenticación).

**Query Params:**
- `search` (string, opcional): Texto de búsqueda
- `page` (number, opcional): Número de página
- `limit` (number, opcional): Elementos por página

---

### GET `/curso/:id`
Obtener curso por ID (requiere autenticación).

---

### PATCH `/curso/:id`
Actualizar curso por ID (requiere autenticación).

---

### DELETE `/curso/:id`
Eliminar curso por ID (requiere autenticación).

---

## 📅 Cursos Ofertados

Secciones específicas de cursos en un semestre.

### POST `/ofertado`
Crear curso ofertado (requiere autenticación y rol ALUMNO o PROFESOR).

**Body:**
```json
{
  "cursoId": 1,
  "profesorId": 1,
  "seccion": "A",
  "semestre": "2025-1",
  "vacantes": 30,
  "horario": "Lunes 8:00-10:00, Miércoles 8:00-10:00"
}
```

---

### GET `/ofertado`
Listar todos los cursos ofertados (requiere autenticación y rol ALUMNO o PROFESOR).

---

### GET `/ofertado/:id`
Obtener curso ofertado por ID (requiere autenticación).

---

### PATCH `/ofertado/:id`
Actualizar curso ofertado por ID (requiere autenticación).

---

### DELETE `/ofertado/:id`
Eliminar curso ofertado por ID (requiere autenticación).

---

### POST `/ofertado/upload`
Carga masiva de cursos ofertados desde archivo CSV/Excel (solo ADMIN).

**Headers:**
```
Authorization: Bearer <token_admin>
Content-Type: multipart/form-data
```

**Body (form-data):**
- `file`: Archivo CSV/Excel

**Formato del archivo:**
El archivo debe tener las siguientes columnas:
- `codigo_curso` o `curso_codigo`: Código del curso
- `codigo_profesor` o `profesor_codigo`: Código del profesor
- `semestre`: Semestre (ej: "2024-2")
- `seccion`: Sección (ej: "A", "B")
- `vacantes`: Número de vacantes
- `horario`: Horario del curso (opcional)
- `aula`: Aula asignada (opcional)

**Ejemplo CSV:**
```csv
codigo_curso,codigo_profesor,semestre,seccion,vacantes,horario,aula
CIB02,P123,2024-2,A,30,Lunes 8:00-10:00,A-101
MAT101,P456,2024-2,B,35,Martes 10:00-12:00,B-202
```

**Respuesta (200):**
```json
{
  "message": "Carga masiva completada",
  "created": 45,
  "errors": 2,
  "details": {
    "created_records": [...],
    "failed_records": [
      {
        "row": {...},
        "error": "Curso con código XYZ no encontrado"
      }
    ]
  }
}
```

**Errores:**
- **400 Bad Request** - Error procesando archivo CSV
- **401 Unauthorized** - No autorizado (requiere token ADMIN)

---

## 📝 Matrículas

Registro de inscripciones de alumnos a cursos ofertados.

### POST `/matricula`
Crear nueva matrícula (requiere autenticación y rol ALUMNO o PROFESOR).

**Body:**
```json
{
  "alumnoId": 1,
  "ofertadoId": 1,
  "semestre": "2025-1",
  "estado": "MATRICULADO"
}
```

---

### GET `/matricula`
Listar todas las matrículas (requiere autenticación y rol ALUMNO o PROFESOR).

---

### GET `/matricula/:id`
Obtener matrícula por ID (requiere autenticación).

---

### PATCH `/matricula/:id`
Actualizar matrícula por ID (requiere autenticación).

---

### DELETE `/matricula/:id`
Eliminar matrícula por ID (requiere autenticación).

---

## 📊 Demanda

Predicciones y análisis de demanda de cursos.

### POST `/demanda`
Crear registro de demanda.

**Body:**
```json
{
  "cursoId": 1,
  "semestre": "2025-1",
  "demandaPredicha": 45,
  "demandaReal": 42,
  "modelo": "RandomForest"
}
```

---

### GET `/demanda`
Listar todos los registros de demanda.

---

### GET `/demanda/:id`
Obtener demanda por ID.

---

### PATCH `/demanda/:id`
Actualizar demanda por ID.

---

### DELETE `/demanda/:id`
Eliminar demanda por ID.

---

## 💳 Créditos

Gestión de créditos académicos.

### POST `/credito`
Crear registro de créditos.

---

### GET `/credito`
Listar todos los créditos.

---

### GET `/credito/:id`
Obtener crédito por ID.

---

### PATCH `/credito/:id`
Actualizar crédito por ID.

---

### DELETE `/credito/:id`
Eliminar crédito por ID.

---

## 🔗 Requisitos

Prerrequisitos de cursos.

### POST `/requisito`
Crear requisito de curso.

**Body:**
```json
{
  "cursoId": 5,
  "requisitoId": 2,
  "tipo": "PREREQUISITO"
}
```

---

### GET `/requisito`
Listar todos los requisitos.

---

### GET `/requisito/:id`
Obtener requisito por ID.

---

### PATCH `/requisito/:id`
Actualizar requisito por ID.

---

### DELETE `/requisito/:id`
Eliminar requisito por ID.

---

## 🔄 Relativos

Relaciones entre entidades del sistema.

### POST `/relativo`
Crear relación.

---

### GET `/relativo`
Listar todas las relaciones.

---

### GET `/relativo/:id`
Obtener relación por ID.

---

### PATCH `/relativo/:id`
Actualizar relación por ID.

---

### DELETE `/relativo/:id`
Eliminar relación por ID.

---

## 🔒 Control de Acceso (Roles)

El sistema maneja roles para control de acceso:

- **ALUMNO**: Acceso a consultas, matriculación y visualización
- **PROFESOR**: Acceso a gestión de cursos ofertados y calificaciones
- **ADMIN**: Acceso completo al sistema

### Decoradores de autorización:
```typescript
@Roles('ALUMNO')           // Solo alumnos
@Roles('PROFESOR')         // Solo profesores
@Roles('ALUMNO', 'PROFESOR') // Alumnos o profesores
```

---

## ⚠️ Códigos de Respuesta HTTP

| Código | Significado |
|--------|-------------|
| 200 | OK - Solicitud exitosa |
| 201 | Created - Recurso creado exitosamente |
| 400 | Bad Request - Datos inválidos |
| 401 | Unauthorized - No autenticado |
| 403 | Forbidden - Sin permisos suficientes |
| 404 | Not Found - Recurso no encontrado |
| 500 | Internal Server Error - Error del servidor |

---

## 📝 Notas Importantes

1. **Todos los endpoints protegidos** requieren el header `Authorization: Bearer <token>`
2. **Los DTOs** (Data Transfer Objects) validan automáticamente los datos de entrada
3. **La paginación** por defecto es de 10 elementos por página
4. **La búsqueda** es case-insensitive y busca en múltiples campos
5. **Los timestamps** se manejan automáticamente por Prisma (createdAt, updatedAt)

---

## 🛠️ Tecnologías

- **Framework**: NestJS 10.x
- **Lenguaje**: TypeScript
- **ORM**: Prisma
- **Base de datos**: PostgreSQL
- **Autenticación**: JWT (JSON Web Tokens)
- **Validación**: class-validator, class-transformer

---

## 📚 Recursos Adicionales

- [Documentación NestJS](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [JWT.io](https://jwt.io/)
