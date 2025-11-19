import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProfesorDto, UpdateProfesorDto } from './dto';
import { PrismaService } from '../../prisma/prisma.service';
import { SearchDto } from '../../common/dto';
import { paginationHelper } from '../../common/helpers';

@Injectable()
export class ProfesorService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProfesorDto) {
    return await this.prisma.profesor.create({
      data: dto,
    });
  }

  async findAll(dto: SearchDto) {
    const { search, ...pagination } = dto;
    const where: any = {};
    if (search) where.codigo = { contains: search, mode: 'insensitive' };
    return await paginationHelper(
      this.prisma.profesor,
      {
        select: {
          id: true,
          codigo_profesor: true,
          nombre: true,
          popularidad: true,
          experiencia_anios: true,
          estado: true,
        },
        where,
        orderBy: { nombre: 'asc' },
      },
      pagination,
    );
  }

  async findOne(id: number) {
    return await this.getProfesorById(id);
  }

  async update(id: number, dto: UpdateProfesorDto) {
    await this.getProfesorById(id);
    return this.prisma.profesor.update({
      data: dto,
      where: { id },
    });
  }

  delete(id: number) {
    return `This action removes a #${id} Profesor`;
  }

  private async getProfesorById(id: number) {
    const profesor = await this.prisma.profesor.findUnique({
      where: { id },
    });
    if (!profesor) throw new BadRequestException('Profesor no encontrado');
    return profesor;
  }
}
