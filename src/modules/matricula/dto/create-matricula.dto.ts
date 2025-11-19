import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMatriculaDto {
  @IsNumber()
  alumno_id: number;

  @IsNumber()
  curso_ofertado_id: number;
  
  @IsOptional()
  fecha_matricula?: Date

  @IsOptional()
  @IsNumber()
  nota_final?: number;

  @IsOptional()
  @IsString()
  estado?: string;
}
