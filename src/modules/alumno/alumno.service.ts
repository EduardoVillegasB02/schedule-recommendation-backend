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
