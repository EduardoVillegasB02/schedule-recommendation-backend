import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCursoDto, UpdateCursoDto } from './dto';
import { PrismaService } from '../../prisma/prisma.service';
import { SearchDto } from '../../common/dto';
import { paginationHelper } from '../../common/helpers';

@Injectable()
export class CursoService {
  constructor(private prisma: PrismaService) {}
  
  async create(dto: CreateCursoDto) {
    return await this.prisma.curso.create({
      data: dto,
    });
  }

  async findAll(dto: SearchDto) {
    const { search, ...pagination } = dto;
    const where: any = {};
    if (search)
      where.OR = [
        { codigo: { contains: search, mode: 'insensitive' } },
        { nombre: { contains: search, mode: 'insensitive' } },
      ];
    return await paginationHelper(
      this.prisma.curso,
      {
        select: {
          id: true,
          codigo: true,
          nombre: true,
          tipo: true,
          ciclo: true,
          sistema_eval: true,
          ht: true,
          hp: true,
          hl: true,
          creditos: true,
        },
        where,
        orderBy: { id: 'asc' },
      },
      pagination,
    );
  }

  async findOne(id: number) {
    return await this.getCursoById(id);
  }

  async update(id: number, dto: UpdateCursoDto) {
    await this.getCursoById(id);
    return this.prisma.curso.update({
      data: dto,
      where: { id },
    });
  }

  async remove(id: number) {
    return `This action removes a #${id} curso`;
  }

  private async getCursoById(id: number) {
    const curso = await this.prisma.curso.findUnique({
      where: { id },
    });
    if (!curso) throw new BadRequestException('Curso no encontrado');
    return curso;
  }
}
