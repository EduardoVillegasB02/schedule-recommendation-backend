import { IsNumber, IsString } from 'class-validator';

export class CreateProfesorDto {
  @IsString()
  nombre: string;

  @IsNumber()
  experiencia_anios: number;
}
