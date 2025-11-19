import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RelativoService } from './relativo.service';
import { CreateRelativoDto } from './dto/create-relativo.dto';
import { UpdateRelativoDto } from './dto/update-relativo.dto';

@Controller('relativo')
export class RelativoController {
  constructor(private readonly relativoService: RelativoService) {}

  @Post()
  create(@Body() createRelativoDto: CreateRelativoDto) {
    return this.relativoService.create(createRelativoDto);
  }

  @Get()
  findAll() {
    return this.relativoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.relativoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRelativoDto: UpdateRelativoDto,
  ) {
    return this.relativoService.update(+id, updateRelativoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.relativoService.remove(+id);
  }
}
