import { Controller, Post, Body, UseGuards, Req, Get, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, RegisterAdminDto, RegisterAlumnoDto, RegisterProfesorDto } from './dto';
import { UpdateProfileDto, ChangePasswordDto } from '../modules/users/dto';
import { JwtAuthGuard, Roles, RolesGuard } from './guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Req() req: any) {
    return this.authService.logout(req.user);
  }

  // Registrar usuario para alumno/profesor existente (solo ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  // Registrar admin (solo ADMIN puede crear otros admins)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post('register/admin')
  registerAdmin(@Body() dto: RegisterAdminDto) {
    return this.authService.registerAdmin(dto);
  }

  // Registrar alumno + usuario (solo ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post('register/alumno')
  registerAlumno(@Body() dto: RegisterAlumnoDto) {
    return this.authService.registerAlumno(dto);
  }

  // Registrar profesor + usuario (solo ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post('register/profesor')
  registerProfesor(@Body() dto: RegisterProfesorDto) {
    return this.authService.registerProfesor(dto);
  }

  // Obtener perfil del usuario actual
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: any) {
    return this.authService.getProfile(req.user.sub);
  }

  // Actualizar perfil del usuario actual
  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  updateProfile(@Req() req: any, @Body() dto: UpdateProfileDto) {
    return this.authService.updateProfile(req.user.sub, dto);
  }

  // Cambiar contraseña del usuario actual
  @UseGuards(JwtAuthGuard)
  @Patch('change-password')
  changePassword(@Req() req: any, @Body() dto: ChangePasswordDto) {
    return this.authService.changePassword(req.user.sub, dto);
  }
}
