# API REST - Backend del Sistema de Horarios UNI

API principal del sistema de recomendación y generación de horarios construida con NestJS, TypeScript y Prisma ORM.

## 🔗 Base URL

```
http://localhost:4000
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
2. [Alumnos](#alumnos)
3. [Profesores](#profesores)
4. [Cursos](#cursos)
5. [Cursos Ofertados](#cursos-ofertados)
6. [Matrículas](#matrículas)
7. [Demanda](#demanda)
8. [Créditos](#créditos)
9. [Requisitos](#requisitos)
10. [Relativos](#relativos)

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
