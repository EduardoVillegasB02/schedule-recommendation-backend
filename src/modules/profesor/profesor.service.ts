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
    if (search) where.codigo_profesor = { contains: search, mode: 'insensitive' };
    return await paginationHelper(
      this.prisma.profesor,
      {
        select: {
          id: true,
          codigo_profesor: true,
          nombre: true,
          popularidad: true,
          experiencia_anios: true,
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

  async searchAdvanced(filters: {
    codigo_profesor?: string;
    nombre?: string;
    experiencia_min?: number;
    experiencia_max?: number;
    popularidad_min?: number;
  }) {
    const where: any = {};

    if (filters.codigo_profesor) {
      where.codigo_profesor = {
        contains: filters.codigo_profesor,
        mode: 'insensitive',
      };
    }

    if (filters.nombre) {
      where.nombre = { contains: filters.nombre, mode: 'insensitive' };
    }

    if (
      filters.experiencia_min !== undefined ||
      filters.experiencia_max !== undefined
    ) {
      where.experiencia_anios = {};
      if (filters.experiencia_min !== undefined) {
        where.experiencia_anios.gte = filters.experiencia_min;
      }
      if (filters.experiencia_max !== undefined) {
        where.experiencia_anios.lte = filters.experiencia_max;
      }
    }

    if (filters.popularidad_min !== undefined) {
      where.popularidad = { gte: filters.popularidad_min };
    }

    const profesores = await this.prisma.profesor.findMany({
      where,
      orderBy: { nombre: 'asc' },
      take: 100, // Limitar resultados
    });

    return {
      total: profesores.length,
      profesores,
    };
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
