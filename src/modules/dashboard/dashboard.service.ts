import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  /**
   * Dashboard para ALUMNO
   * Muestra: créditos cursados/aprobados, promedio, cursos actuales, progreso
   */
  async getAlumnoDashboard(alumnoId: number) {
    const alumno = await this.prisma.alumno.findUnique({
      where: { id: alumnoId },
      include: {
        matricula: {
          include: {
            curso_ofertado: {
              include: {
                curso: true,
                profesor: true,
              },
            },
          },
        },
      },
    });

    if (!alumno) {
      return null;
    }

    // Obtener semestre actual
    const semestreActualObj = await this.prisma.curso_ofertado.findFirst({
      select: { semestre: true },
      orderBy: { semestre: 'desc' },
    });
    const semestreActual = semestreActualObj?.semestre || 'N/A';

    // Matriculas del semestre actual
    const matriculasActuales = alumno.matricula.filter(
      (m) => m.curso_ofertado.semestre === semestreActual,
    );

    // Calcular estadísticas
    const totalMatriculas = alumno.matricula.length;
    const aprobados = alumno.matricula.filter(
      (m) => m.estado?.toLowerCase() === 'aprobado',
    ).length;
    const desaprobados = alumno.matricula.filter(
      (m) => m.estado?.toLowerCase() === 'desaprobado',
    ).length;
    const enCurso = alumno.matricula.filter(
      (m) => m.estado?.toLowerCase() === 'matriculado',
    ).length;

    return {
      alumno: {
        id: alumno.id,
        codigo: alumno.codigo,
        nombres: alumno.nombres,
        apellidos: alumno.apellidos,
        ciclo_relativo: alumno.ciclo_relativo,
        estado: alumno.estado,
      },
      creditos: {
        aprobados: alumno.creditos_aprobados || 0,
        promedio: alumno.promedio ? parseFloat(alumno.promedio.toString()) : 0,
      },
      estadisticas: {
        total_cursos: totalMatriculas,
        aprobados,
        desaprobados,
        en_curso: enCurso,
        tasa_aprobacion: totalMatriculas > 0 ? (aprobados / totalMatriculas) * 100 : 0,
      },
      semestre_actual: {
        semestre: semestreActual,
        cursos: matriculasActuales.map((m) => ({
          curso_codigo: m.curso_ofertado.curso.codigo,
          curso_nombre: m.curso_ofertado.curso.nombre,
          creditos: m.curso_ofertado.curso.creditos,
          profesor: m.curso_ofertado.profesor?.nombre || 'Sin asignar',
          seccion: m.curso_ofertado.codigo_seccion,
          turno: m.curso_ofertado.turno,
          estado: m.estado,
        })),
        total_creditos: matriculasActuales.reduce(
          (sum, m) => sum + m.curso_ofertado.curso.creditos,
          0,
        ),
      },
    };
  }

  /**
   * Dashboard para PROFESOR
   * Muestra: cursos asignados, total de alumnos, estadísticas de sus cursos
   */
  async getProfesorDashboard(profesorId: number) {
    const profesor = await this.prisma.profesor.findUnique({
      where: { id: profesorId },
      include: {
        curso_ofertado: {
          include: {
            curso: true,
            matricula: {
              include: {
                alumno: true,
              },
            },
          },
          orderBy: { semestre: 'desc' },
        },
      },
    });

    if (!profesor) {
      return null;
    }

    // Obtener semestre actual
    const semestreActualObj = await this.prisma.curso_ofertado.findFirst({
      select: { semestre: true },
      orderBy: { semestre: 'desc' },
    });
    const semestreActual = semestreActualObj?.semestre || 'N/A';

    // Cursos del semestre actual
    const cursosActuales = profesor.curso_ofertado.filter(
      (o) => o.semestre === semestreActual,
    );

    // Estadísticas generales
    const totalAlumnos = profesor.curso_ofertado.reduce(
      (sum, o) => sum + o.matricula.length,
      0,
    );

    const totalCursos = profesor.curso_ofertado.length;
    const cursosDistintos = new Set(profesor.curso_ofertado.map((o) => o.curso_id)).size;

    return {
      profesor: {
        id: profesor.id,
        codigo_profesor: profesor.codigo_profesor,
        nombre: profesor.nombre,
        experiencia_anios: profesor.experiencia_anios,
        popularidad: profesor.popularidad
          ? parseFloat(profesor.popularidad.toString())
          : 0,
      },
      estadisticas: {
        total_cursos_ofertados: totalCursos,
        cursos_distintos: cursosDistintos,
        total_alumnos: totalAlumnos,
        promedio_alumnos_por_curso: totalCursos > 0 ? totalAlumnos / totalCursos : 0,
      },
      semestre_actual: {
        semestre: semestreActual,
        cursos: cursosActuales.map((o) => ({
          curso_codigo: o.curso.codigo,
          curso_nombre: o.curso.nombre,
          seccion: o.codigo_seccion,
          cupos_disponibles: o.cupos_disponibles,
          alumnos_matriculados: o.matricula.length,
          ocupacion:
            o.cupos_disponibles > 0
              ? (o.matricula.length / o.cupos_disponibles) * 100
              : 0,
          turno: o.turno,
          alumnos: o.matricula.map((m) => ({
            codigo: m.alumno.codigo,
            nombre: `${m.alumno.nombres || ''} ${m.alumno.apellidos || ''}`.trim(),
            estado: m.estado,
          })),
        })),
      },
    };
  }

  /**
   * Dashboard para ADMIN
   * Muestra: estadísticas globales del sistema, resumen por semestre
   */
  async getAdminDashboard() {
    // Estadísticas generales
    const [
      totalAlumnos,
      totalProfesores,
      totalCursos,
      totalOfertados,
      totalMatriculas,
      totalUsuarios,
    ] = await Promise.all([
      this.prisma.alumno.count(),
      this.prisma.profesor.count(),
      this.prisma.curso.count(),
      this.prisma.curso_ofertado.count(),
      this.prisma.matricula.count(),
      this.prisma.usuario.count(),
    ]);

    // Obtener semestre actual
    const semestreActualObj = await this.prisma.curso_ofertado.findFirst({
      select: { semestre: true },
      orderBy: { semestre: 'desc' },
    });
    const semestreActual = semestreActualObj?.semestre || 'N/A';

    // Estadísticas del semestre actual
    const ofertadosSemestreActual = await this.prisma.curso_ofertado.findMany({
      where: { semestre: semestreActual },
      include: {
        matricula: true,
      },
    });

    const matriculasSemestreActual = ofertadosSemestreActual.reduce(
      (sum, o) => sum + o.matricula.length,
      0,
    );

    // Estadísticas de matrícula por estado
    const todasMatriculasSemestre = await this.prisma.matricula.findMany({
      where: {
        curso_ofertado: {
          semestre: semestreActual,
        },
      },
      select: {
        estado: true,
      },
    });

    const estadisticasEstado = todasMatriculasSemestre.reduce((acc, m) => {
      const estado = m.estado || 'Sin estado';
      acc[estado] = (acc[estado] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Obtener todos los cursos del semestre para ordenar por conteo real
    const todosCursosSemestre = await this.prisma.curso_ofertado.findMany({
      where: { semestre: semestreActual },
      include: {
        curso: true,
        profesor: true,
        matricula: true,
      },
    });

    // Mapear y ordenar por conteo real de matrículas
    const cursosConConteo = todosCursosSemestre.map((o) => ({
      curso_codigo: o.curso.codigo,
      curso_nombre: o.curso.nombre,
      profesor: o.profesor?.nombre || 'Sin asignar',
      seccion: o.codigo_seccion,
      matriculados: o.matricula.length,
      vacantes: o.cupos_disponibles,
    }));

    // Top 5 cursos con más demanda (saturados)
    const topCursosDetalle = cursosConConteo
      .sort((a, b) => b.matriculados - a.matriculados)
      .slice(0, 5);

    // Top 5 cursos con baja matrícula
    const cursosBajaMatriculaDetalle = cursosConConteo
      .sort((a, b) => a.matriculados - b.matriculados)
      .slice(0, 5);

    // Distribución de alumnos por ciclo relativo
    const distribucionCiclos = await this.prisma.alumno.groupBy({
      by: ['ciclo_relativo'],
      _count: true,
      orderBy: {
        ciclo_relativo: 'asc',
      },
    });

    // Promedio general de todos los alumnos
    const promedioGeneral = await this.prisma.alumno.aggregate({
      _avg: {
        promedio: true,
      },
    });

    return {
      resumen: {
        total_alumnos: totalAlumnos,
        total_profesores: totalProfesores,
        total_cursos: totalCursos,
        total_usuarios: totalUsuarios,
      },
      semestre_actual: {
        semestre: semestreActual,
        cursos_ofertados: ofertadosSemestreActual.length,
        total_matriculas: matriculasSemestreActual,
        promedio_matriculas_por_curso:
          ofertadosSemestreActual.length > 0
            ? matriculasSemestreActual / ofertadosSemestreActual.length
            : 0,
      },
      estadisticas_matricula: Object.entries(estadisticasEstado).map(([estado, cantidad]) => ({
        estado,
        cantidad,
      })),
      top_cursos_demanda: topCursosDetalle,
      cursos_baja_matricula: cursosBajaMatriculaDetalle,
      distribucion_ciclos: distribucionCiclos.map((item) => ({
        ciclo: item.ciclo_relativo,
        alumnos: item._count,
      })),
      rendimiento: {
        promedio_general: promedioGeneral._avg.promedio
          ? parseFloat(promedioGeneral._avg.promedio.toString())
          : 0,
      },
    };
  }
}
