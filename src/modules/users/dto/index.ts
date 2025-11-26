import { IsEmail, IsString, IsOptional, IsEnum, IsInt, MinLength } from 'class-validator';

export enum UserRole {
  ADMIN = 'ADMIN',
  ALUMNO = 'ALUMNO',
  PROFESOR = 'PROFESOR',
}

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsEnum(UserRole)
  rol?: UserRole;

  @IsOptional()
  @IsInt()
  alumno_id?: number;

  @IsOptional()
  @IsInt()
  profesor_id?: number;
}

export class ChangePasswordDto {
  @IsString()
  @MinLength(6)
  currentPassword: string;

  @IsString()
  @MinLength(6)
  newPassword: string;
}

export class UpdateProfileDto {
  @IsOptional()
  @IsEmail()
  email?: string;
}
