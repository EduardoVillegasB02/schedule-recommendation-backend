import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMatriculaDto, UpdateMatriculaDto } from './dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MatriculaService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateMatriculaDto) {
    return await this.prisma.matricula.create({
      data: dto,
    });
  }

  async findAll() {
    return await this.prisma.matricula.findMany();
  }

  async findOne(id: number) {
    return await this.getMatriculaById(id);
  }

  async update(id: number, dto: UpdateMatriculaDto) {
    await this.getMatriculaById(id);
    return this.prisma.matricula.update({
      data: dto,
      where: { id },
    });
  }

  async remove(id: number) {
    return `This action removes a #${id} matricula`;
  }
  
  private async getMatriculaById(id: number) {
    const matricula = await this.prisma.matricula.findUnique({
      where: { id },
    });
    if (!matricula) throw new BadRequestException('Matrícula no encontrada');
    return matricula;
  }
}
