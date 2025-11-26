import { Injectable, UnauthorizedException, BadRequestException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto, RegisterDto, RegisterAdminDto, RegisterAlumnoDto, RegisterProfesorDto } from './dto';
import { JwtPayload } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async login(dto: LoginDto) {
    const { email, password } = dto;
    
    // Buscar usuario por email
    const user = await this.prisma.usuario.findUnique({
      where: { email },
      include: {
        alumno: true,
        profesor: true,
      },
    });
    
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    
    // Validar contraseña (usando hash simple de Buffer)
    const hashedPassword = Buffer.from(password).toString('base64');
    if (user.password !== hashedPassword) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    
    // Generar token JWT
    const token = await this.getJwtToken({ 
      sub: user.id.toString(),
      email: user.email,
      rol: user.rol,
    });
    
    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        rol: user.rol,
        alumno: user.alumno,
        profesor: user.profesor,
      },
    };
  }

  async logout(user: any) {
    const { user_id: codigo, rol } = user;
    if (rol === 'ALUMNO')
      await this.prisma.alumno.update({
        data: { token: null },
        where: { codigo },
      });
    else
      await this.prisma.profesor.update({
        data: { token: null },
        where: { codigo_profesor: codigo },
      });
    return {
      user: codigo,
    };
  }

  // Registrar usuario para alumno/profesor existente
  async register(dto: RegisterDto) {
    const { email, password, rol, alumno_id, profesor_id, codigo, codigo_profesor } = dto;

    // Verificar si el email ya existe
    const existingUser = await this.prisma.usuario.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('El email ya está registrado');
    }

    // Validar y obtener IDs según el rol
    let finalAlumnoId = alumno_id;
    let finalProfesorId = profesor_id;

    if (rol === 'ALUMNO') {
      if (codigo) {
        // Buscar alumno por código
        const alumno = await this.prisma.alumno.findUnique({
          where: { codigo },
        });
        if (!alumno) {
          throw new BadRequestException(`No existe alumno con código ${codigo}`);
        }
        finalAlumnoId = alumno.id;
      } else if (!alumno_id) {
        throw new BadRequestException('Debe proporcionar alumno_id o codigo');
      }

      // Verificar que el alumno no tenga usuario ya
      const existingAlumnoUser = await this.prisma.usuario.findFirst({
        where: { alumno_id: finalAlumnoId },
      });
      if (existingAlumnoUser) {
        throw new ConflictException('Este alumno ya tiene un usuario registrado');
      }
    }

    if (rol === 'PROFESOR') {
      if (codigo_profesor) {
        // Buscar profesor por código
        const profesor = await this.prisma.profesor.findUnique({
          where: { codigo_profesor },
        });
        if (!profesor) {
          throw new BadRequestException(`No existe profesor con código ${codigo_profesor}`);
        }
        finalProfesorId = profesor.id;
      } else if (!profesor_id) {
        throw new BadRequestException('Debe proporcionar profesor_id o codigo_profesor');
      }

      // Verificar que el profesor no tenga usuario ya
      const existingProfesorUser = await this.prisma.usuario.findFirst({
        where: { profesor_id: finalProfesorId },
      });
      if (existingProfesorUser) {
        throw new ConflictException('Este profesor ya tiene un usuario registrado');
      }
    }

    // Hash de contraseña (simple para desarrollo)
    const hashedPassword = Buffer.from(password).toString('base64');

    // Crear usuario
    const user = await this.prisma.usuario.create({
      data: {
        email,
        password: hashedPassword,
        rol,
        alumno_id: finalAlumnoId,
        profesor_id: finalProfesorId,
      },
      include: {
        alumno: true,
        profesor: true,
      },
    });

    return {
      message: 'Usuario creado exitosamente',
      user: {
        id: user.id,
        email: user.email,
        rol: user.rol,
        alumno: user.alumno,
        profesor: user.profesor,
      },
    };
  }

  // Registrar solo admin
  async registerAdmin(dto: RegisterAdminDto) {
    const { email, password } = dto;

    // Verificar si el email ya existe
    const existingUser = await this.prisma.usuario.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('El email ya está registrado');
    }

    // Hash de contraseña
    const hashedPassword = Buffer.from(password).toString('base64');

    // Crear usuario admin
    const user = await this.prisma.usuario.create({
      data: {
        email,
        password: hashedPassword,
        rol: 'ADMIN',
      },
    });

    return {
      message: 'Usuario admin creado exitosamente',
      user: {
        id: user.id,
        email: user.email,
        rol: user.rol,
      },
    };
  }

  // Registrar alumno + usuario
  async registerAlumno(dto: RegisterAlumnoDto) {
    const { email, password, codigo, nombres, apellidos, ciclo_relativo, creditos_aprobados, promedio, estado } = dto;

    // Verificar si el email ya existe
    const existingUser = await this.prisma.usuario.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('El email ya está registrado');
    }

    // Verificar si el código ya existe
    const existingAlumno = await this.prisma.alumno.findUnique({
      where: { codigo },
    });

    if (existingAlumno) {
      throw new ConflictException('El código de alumno ya existe');
    }

    // Hash de contraseña
    const hashedPassword = Buffer.from(password).toString('base64');

    // Crear alumno y usuario en una transacción
    const result = await this.prisma.$transaction(async (prisma) => {
      // Crear alumno
      const alumno = await prisma.alumno.create({
        data: {
          codigo,
          nombres,
          apellidos,
          ciclo_relativo,
          creditos_aprobados,
          promedio,
          estado,
        },
      });

      // Crear usuario
      const user = await prisma.usuario.create({
        data: {
          email,
          password: hashedPassword,
          rol: 'ALUMNO',
          alumno_id: alumno.id,
        },
        include: {
          alumno: true,
        },
      });

      return { alumno, user };
    });

    return {
      message: 'Alumno y usuario creados exitosamente',
      user: {
        id: result.user.id,
        email: result.user.email,
        rol: result.user.rol,
        alumno: result.alumno,
      },
    };
  }

  // Registrar profesor + usuario
  async registerProfesor(dto: RegisterProfesorDto) {
    const { email, password, nombre, codigo_profesor, experiencia_anios, popularidad } = dto;

    // Verificar si el email ya existe
    const existingUser = await this.prisma.usuario.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('El email ya está registrado');
    }

    // Verificar si el código ya existe
    const existingProfesor = await this.prisma.profesor.findUnique({
      where: { codigo_profesor },
    });

    if (existingProfesor) {
      throw new ConflictException('El código de profesor ya existe');
    }

    // Hash de contraseña
    const hashedPassword = Buffer.from(password).toString('base64');

    // Crear profesor y usuario en una transacción
    const result = await this.prisma.$transaction(async (prisma) => {
      // Crear profesor
      const profesor = await prisma.profesor.create({
        data: {
          nombre,
          codigo_profesor,
          experiencia_anios,
          popularidad,
        },
      });

      // Crear usuario
      const user = await prisma.usuario.create({
        data: {
          email,
          password: hashedPassword,
          rol: 'PROFESOR',
          profesor_id: profesor.id,
        },
        include: {
          profesor: true,
        },
      });

      return { profesor, user };
    });

    return {
      message: 'Profesor y usuario creados exitosamente',
      user: {
        id: result.user.id,
        email: result.user.email,
        rol: result.user.rol,
        profesor: result.profesor,
      },
    };
  }

  // Obtener perfil del usuario actual
  async getProfile(userId: number) {
    const user = await this.prisma.usuario.findUnique({
      where: { id: userId },
      include: {
        alumno: true,
        profesor: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    return {
      id: user.id,
      email: user.email,
      rol: user.rol,
      alumno: user.alumno,
      profesor: user.profesor,
    };
  }

  // Actualizar perfil del usuario actual
  async updateProfile(userId: number, dto: any) {
    const { email } = dto;

    // Verificar que el usuario existe
    const user = await this.prisma.usuario.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    // Verificar que el email no esté en uso por otro usuario
    if (email && email !== user.email) {
      const existingUser = await this.prisma.usuario.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new ConflictException('El email ya está registrado');
      }
    }

    // Actualizar usuario
    const updatedUser = await this.prisma.usuario.update({
      where: { id: userId },
      data: { email },
      include: {
        alumno: true,
        profesor: true,
      },
    });

    return {
      id: updatedUser.id,
      email: updatedUser.email,
      rol: updatedUser.rol,
      alumno: updatedUser.alumno,
      profesor: updatedUser.profesor,
    };
  }

  // Cambiar contraseña del usuario actual
  async changePassword(userId: number, dto: any) {
    const { currentPassword, newPassword } = dto;

    const user = await this.prisma.usuario.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    // Verificar contraseña actual
    const currentHash = Buffer.from(currentPassword).toString('base64');
    if (user.password !== currentHash) {
      throw new UnauthorizedException('Contraseña actual incorrecta');
    }

    // Actualizar contraseña
    const newHash = Buffer.from(newPassword).toString('base64');
    await this.prisma.usuario.update({
      where: { id: userId },
      data: { password: newHash },
    });

    return { message: 'Contraseña actualizada exitosamente' };
  }

  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.signAsync(payload);
  }
}
