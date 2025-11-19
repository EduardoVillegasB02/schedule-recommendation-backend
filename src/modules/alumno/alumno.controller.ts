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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AlumnoService } from './alumno.service';
import { CreateAlumnoDto, UpdateAlumnoDto } from './dto';
import { SearchDto } from '../../common/dto';
import { JwtAuthGuard, Roles, RolesGuard } from '../../auth/guard';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('alumno')
export class AlumnoController {
  constructor(private readonly alumnoService: AlumnoService) {}

  @Post()
  create(@Body() dto: CreateAlumnoDto) {
    return this.alumnoService.create(dto);
  }

  @Roles('ALUMNO')
  @Get()
  findAll(@Query() dto: SearchDto) {
    return this.alumnoService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alumnoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAlumnoDto) {
    return this.alumnoService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alumnoService.delete(+id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  bulkUpload(@UploadedFile() file: Express.Multer.File) {
    return this.alumnoService.bulkUpload(file);
  }
}
