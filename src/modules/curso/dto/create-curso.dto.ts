import { IsNumber, IsString } from 'class-validator';

export class CreateCursoDto {
  @IsString()
  codigo: string;

  @IsString()
  nombre: string;

  @IsString()
  tipo: string;

  @IsString()
  ciclo: string;

  @IsString()
  sistema_eval: string;

  @IsNumber()
  ht: number;


  @IsNumber()
  hp: number;


  @IsNumber()
  hl: number;

  @IsNumber()
  creditos: number;
}
