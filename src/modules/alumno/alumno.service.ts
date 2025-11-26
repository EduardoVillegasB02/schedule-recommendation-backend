import { BadRequestException, Injectable } from '@nestjs/common';
import * as xlsx from 'xlsx';
import { CreateAlumnoDto, UpdateAlumnoDto } from './dto';
import { PrismaService } from '../../prisma/prisma.service';
import { SearchDto } from '../../common/dto';
import { paginationHelper } from '../../common/helpers';

@Injectable()
export class AlumnoService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAlumnoDto) {
    return await this.prisma.alumno.create({
      data: dto,
    });
  }

  async findAll(dto: SearchDto) {
    const { search, ...pagination } = dto;
    const where: any = {};
    if (search) where.codigo = { contains: search, mode: 'insensitive' };
    return await paginationHelper(
      this.prisma.alumno,
      {
        select: {
          id: true,
          codigo: true,
          promedio: true,
          ciclo_relativo: true,
          creditos_aprobados: true,
          estado: true,
        },
        where,
        orderBy: { id: 'asc' },
      },
      pagination,
    );
  }

  async findOne(id: number) {
    return await this.getAlumnoById(id);
  }

  async update(id: number, dto: UpdateAlumnoDto) {
    await this.getAlumnoById(id);
    return this.prisma.alumno.update({
      data: dto,
      where: { id },
    });
  }

  delete(id: number) {
    return `This action removes a #${id} alumno`;
  }

  private async getAlumnoById(id: number) {
    const alumno = await this.prisma.alumno.findUnique({
      where: { id },
    });
    if (!alumno) throw new BadRequestException('Alumno no encontrado');
    return alumno;
  }

  async searchAdvanced(filters: {
    codigo?: string;
    nombres?: string;
    apellidos?: string;
    ciclo_relativo?: number;
    estado?: string;
    promedio_min?: number;
    promedio_max?: number;
  }) {
    const where: any = {};

    if (filters.codigo) {
      where.codigo = { contains: filters.codigo, mode: 'insensitive' };
    }

    if (filters.nombres) {
      where.nombres = { contains: filters.nombres, mode: 'insensitive' };
    }

    if (filters.apellidos) {
      where.apellidos = { contains: filters.apellidos, mode: 'insensitive' };
    }

    if (filters.ciclo_relativo !== undefined) {
      where.ciclo_relativo = filters.ciclo_relativo;
    }

    if (filters.estado) {
      where.estado = { contains: filters.estado, mode: 'insensitive' };
    }

    if (filters.promedio_min !== undefined || filters.promedio_max !== undefined) {
      where.promedio = {};
      if (filters.promedio_min !== undefined) {
        where.promedio.gte = filters.promedio_min;
      }
      if (filters.promedio_max !== undefined) {
        where.promedio.lte = filters.promedio_max;
      }
    }

    const alumnos = await this.prisma.alumno.findMany({
      where,
      orderBy: { codigo: 'asc' },
      take: 100, // Limitar resultados
    });

    return {
      total: alumnos.length,
      alumnos,
    };
  }

  async bulkUpload(file: Express.Multer.File) {
    const workbook = xlsx.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const rows = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    const alumnos = rows.map((row: any) => {
      return {
        nombres: row.nombres,
        apellidos: row.apellidos,
        codigo: row.codigo,
        promedio: row.promedio,
        ciclo_relativo: row.ciclo_relativo,
        creditos_aprobados: row.creditos_aprobados,
      };
    });
    await this.prisma.alumno.createMany({
      data: alumnos,
    });
    return {
      message: 'Creación masiva exitosa',
    };
  }
}
