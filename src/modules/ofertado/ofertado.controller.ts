import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { OfertadoService } from './ofertado.service';
import { CreateOfertadoDto,UpdateOfertadoDto } from './dto';
import { JwtAuthGuard, Roles, RolesGuard } from '../../auth/guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('ofertado')
export class OfertadoController {
  constructor(private readonly ofertadoService: OfertadoService) {}
  
  @Roles('ALUMNO', 'PROFESOR', 'ADMIN')
  @Post()
  create(@Body() createOfertadoDto: CreateOfertadoDto) {
    return this.ofertadoService.create(createOfertadoDto);
  }

  @Roles('ALUMNO', 'PROFESOR', 'ADMIN')
  @Get()
  findAll() {
    return this.ofertadoService.findAll();
  }

  @Roles('ALUMNO', 'PROFESOR', 'ADMIN')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ofertadoService.findOne(+id);
  }

  @Roles('ADMIN')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOfertadoDto: UpdateOfertadoDto,
  ) {
    return this.ofertadoService.update(+id, updateOfertadoDto);
  }

  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ofertadoService.remove(+id);
  }

  @Roles('ADMIN')
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  bulkUpload(@UploadedFile() file: Express.Multer.File) {
    return this.ofertadoService.bulkUpload(file);
  }
}
