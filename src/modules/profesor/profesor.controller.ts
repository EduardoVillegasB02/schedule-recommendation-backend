import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { CreateProfesorDto, UpdateProfesorDto } from './dto';
import { SearchDto } from '../../common/dto';
import { JwtAuthGuard, Roles, RolesGuard } from '../../auth/guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('profesor')
export class ProfesorController {
  constructor(private readonly profesorService: ProfesorService) {}

  @Post()
  create(@Body() dto: CreateProfesorDto) {
    return this.profesorService.create(dto);
  }

  @Roles('ALUMNO')
  @Get()
  findAll(@Query() dto: SearchDto) {
    return this.profesorService.findAll(dto);
  }

  @Get('search/advanced')
  searchProfesores(
    @Query('codigo_profesor') codigoProfesor?: string,
    @Query('nombre') nombre?: string,
    @Query('experiencia_min') experienciaMin?: string,
    @Query('experiencia_max') experienciaMax?: string,
    @Query('popularidad_min') popularidadMin?: string,
  ) {
    return this.profesorService.searchAdvanced({
      codigo_profesor: codigoProfesor,
      nombre,
      experiencia_min: experienciaMin ? parseInt(experienciaMin) : undefined,
      experiencia_max: experienciaMax ? parseInt(experienciaMax) : undefined,
      popularidad_min: popularidadMin ? parseFloat(popularidadMin) : undefined,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profesorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProfesorDto) {
    return this.profesorService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profesorService.delete(+id);
  }
}
