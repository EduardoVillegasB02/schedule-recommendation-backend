import { IsNotEmpty, IsString, IsEmail, IsEnum, IsOptional, IsInt, IsNumber } from 'class-validator';

export enum UserRole {
  ADMIN = 'ADMIN',
  ALUMNO = 'ALUMNO',
  PROFESOR = 'PROFESOR',
}

// DTO para vincular usuario a alumno/profesor existente
export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(UserRole)
  @IsNotEmpty()
  rol: UserRole;

  // Opcional: ID del alumno existente
  @IsOptional()
  @IsInt()
  alumno_id?: number;

  // Opcional: ID del profesor existente
  @IsOptional()
  @IsInt()
  profesor_id?: number;

  // Opcional: Código del alumno (alternativa a alumno_id)
  @IsOptional()
  @IsString()
  codigo?: string;

  // Opcional: Código del profesor (alternativa a profesor_id)
  @IsOptional()
  @IsString()
  codigo_profesor?: string;
}

// DTO para crear solo usuario admin
export class RegisterAdminDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

// DTO para crear alumno + usuario
export class RegisterAlumnoDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  // Datos del alumno
  @IsString()
  @IsNotEmpty()
  codigo: string;

  @IsString()
  @IsNotEmpty()
  nombres: string;

  @IsString()
  @IsNotEmpty()
  apellidos: string;

  @IsInt()
  @IsNotEmpty()
  ciclo_relativo: number;

  @IsNumber()
  @IsNotEmpty()
  creditos_aprobados: number;

  @IsNumber()
  @IsNotEmpty()
  promedio: number;

  @IsString()
  @IsNotEmpty()
  estado: string;
}

// DTO para crear profesor + usuario
export class RegisterProfesorDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  // Datos del profesor
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  codigo_profesor: string;

  @IsInt()
  @IsNotEmpty()
  experiencia_anios: number;

  @IsNumber()
  @IsNotEmpty()
  popularidad: number;
}
