import { BadRequestException, Injectable } from '@nestjs/common';
import * as xlsx from 'xlsx';
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
    return await this.prisma.curso_ofertado.findMany({
      include: {
        curso: {
          select: {
            id: true,
            codigo: true,
            nombre: true,
            creditos: true,
          },
        },
        profesor: {
          select: {
            id: true,
            codigo_profesor: true,
            nombre: true,
          },
        },
      },
      orderBy: [
        { semestre: 'desc' },
        { curso: { codigo: 'asc' } },
      ],
    });
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

  async bulkUpload(file: Express.Multer.File) {
    try {
      const workbook = xlsx.read(file.buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const rows = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

      const created: any[] = [];
      const errors: any[] = [];

      for (const row of rows) {
        try {
          const rowData = row as any;
          
          // Buscar curso por código
          const curso = await this.prisma.curso.findFirst({
            where: { codigo: String(rowData['codigo_curso'] || rowData['curso_codigo']) },
          });

          if (!curso) {
            errors.push({
              row: rowData,
              error: `Curso con código ${rowData['codigo_curso'] || rowData['curso_codigo']} no encontrado`,
            });
            continue;
          }

          // Buscar profesor por código
          const profesor = await this.prisma.profesor.findFirst({
            where: {
              codigo_profesor: String(
                rowData['codigo_profesor'] || rowData['profesor_codigo'],
              ),
            },
          });

          if (!profesor) {
            errors.push({
              row: rowData,
              error: `Profesor con código ${rowData['codigo_profesor'] || rowData['profesor_codigo']} no encontrado`,
            });
            continue;
          }

          // Crear curso ofertado
          const ofertado = await this.prisma.curso_ofertado.create({
            data: {
              curso_id: curso.id,
              profesor_id: profesor.id,
              semestre: String(rowData['semestre']),
              codigo_seccion: String(rowData['seccion'] || rowData['codigo_seccion']),
              turno: String(rowData['turno'] || 'M'),
              cupos_disponibles: Number(rowData['vacantes'] || rowData['cupos_disponibles'] || 0),
            },
          });

          created.push(ofertado);
        } catch (error: any) {
          errors.push({
            row: row,
            error: error.message,
          });
        }
      }

      return {
        message: 'Carga masiva completada',
        created: created.length,
        errors: errors.length,
        details: {
          created_records: created,
          failed_records: errors,
        },
      };
    } catch (error) {
      throw new BadRequestException(
        `Error procesando archivo CSV: ${error.message}`,
      );
    }
  }

  private async getOfertadoById(id: number) {
    const ofertado = await this.prisma.curso_ofertado.findUnique({
      where: { id },
    });
    if (!ofertado) throw new BadRequestException('Curso ofertado no encontrado');
    return ofertado;
  }
}
