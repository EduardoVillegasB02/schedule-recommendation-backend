import { Controller, Get, UseGuards, Req, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard, Roles, RolesGuard } from '../../auth/guard';

// Dashboard endpoints for different user roles
@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('alumno')
  @UseGuards(RolesGuard)
  @Roles('ALUMNO', 'ADMIN')
  async getAlumnoDashboard(@Req() req: any, @Query('alumno_id') alumnoId?: string) {
    // Si es alumno, usar su propio ID
    if (req.user.rol === 'ALUMNO') {
      if (!req.user.alumno || !req.user.alumno.id) {
        return { error: 'Usuario no vinculado a alumno' };
      }
      return this.dashboardService.getAlumnoDashboard(req.user.alumno.id);
    }

    // Si es admin, debe proporcionar alumno_id como query param
    if (!alumnoId) {
      return { error: 'Admin debe especificar alumno_id como query param. Ejemplo: /dashboard/alumno?alumno_id=504' };
    }

    return this.dashboardService.getAlumnoDashboard(Number(alumnoId));
  }

  @Get('profesor')
  @UseGuards(RolesGuard)
  @Roles('PROFESOR', 'ADMIN')
  async getProfesorDashboard(@Req() req: any, @Query('profesor_id') profesorId?: string) {
    if (req.user.rol === 'PROFESOR') {
      if (!req.user.profesor || !req.user.profesor.id) {
        return { error: 'Usuario no vinculado a profesor' };
      }
      return this.dashboardService.getProfesorDashboard(req.user.profesor.id);
    }

    // Si es admin, debe proporcionar profesor_id como query param
    if (!profesorId) {
      return { error: 'Admin debe especificar profesor_id como query param. Ejemplo: /dashboard/profesor?profesor_id=12' };
    }

    return this.dashboardService.getProfesorDashboard(Number(profesorId));
  }

  @Get('admin')
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  async getAdminDashboard() {
    return this.dashboardService.getAdminDashboard();
  }

  @Get('me')
  async getMyDashboard(@Req() req: any) {
    const rol = req.user.rol;

    switch (rol) {
      case 'ALUMNO':
        if (!req.user.alumno || !req.user.alumno.id) {
          return { error: 'Usuario no vinculado a alumno' };
        }
        return this.dashboardService.getAlumnoDashboard(req.user.alumno.id);

      case 'PROFESOR':
        if (!req.user.profesor || !req.user.profesor.id) {
          return { error: 'Usuario no vinculado a profesor' };
        }
        return this.dashboardService.getProfesorDashboard(req.user.profesor.id);

      case 'ADMIN':
        return this.dashboardService.getAdminDashboard();

      default:
        return { error: 'Rol no reconocido' };
    }
  }
}
