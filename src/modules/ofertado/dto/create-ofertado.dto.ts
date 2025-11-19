import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOfertadoDto {
  @IsNumber()
  curso_id: number;

  @IsOptional()
  @IsNumber()
  profesor_id?: number;
  
  @IsString()
  semestre: string;

  @IsString()
  codigo_seccion: string;

  @IsString()
  turno: string;

  @IsNumber()
  cupos_disponibles: number;

  @IsOptional()
  @IsNumber()
  alumnos_matriculados?: number;
}
