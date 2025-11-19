import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOfertadoDto, UpdateOfertadoDto } from './dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class OfertadoService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateOfertadoDto) {
    return await this.prisma.curso_ofertado.create({
      data: dto,
    });
  }

  async findAll() {
    return await this.prisma.curso_ofertado.findMany();
  }

  async findOne(id: number) {
    return await this.getOfertadoById(id);
  }

  async update(id: number, dto: UpdateOfertadoDto) {
    await this.getOfertadoById(id);
    return this.prisma.curso_ofertado.update({
      data: dto,
      where: { id },
    });
  }

  async remove(id: number) {
    return `This action removes a #${id} ofertado`;
  }

  private async getOfertadoById(id: number) {
    const ofertado = await this.prisma.curso_ofertado.findUnique({
      where: { id },
    });
    if (!ofertado) throw new BadRequestException('Curso ofertado no encontrado');
    return ofertado;
  }
}
