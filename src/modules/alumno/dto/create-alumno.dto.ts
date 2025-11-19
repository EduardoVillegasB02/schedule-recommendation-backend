import { IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateAlumnoDto {
  @IsString()
  codigo: string;

  @IsNumber()
  @Min(0)
  @Max(11)
  ciclo_relativo: number;
}
