import { Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateUserDto, ChangePasswordDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Listar todos los usuarios
  async findAll() {
    const usuarios = await this.prisma.usuario.findMany({
      include: {
        alumno: true,
        profesor: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    // Ocultar contraseñas
    return usuarios.map(u => ({
      ...u,
      password: undefined,
    }));
  }

  // Obtener usuario por ID
  async findOne(id: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
      include: {
        alumno: true,
        profesor: true,
      },
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    // Ocultar contraseña
    return {
      ...usuario,
      password: undefined,
    };
  }

  // Actualizar usuario
  async update(id: number, dto: UpdateUserDto) {
    // Verificar que el usuario existe
    const existingUser = await this.prisma.usuario.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    // Si se cambia el email, verificar que no exista
    if (dto.email && dto.email !== existingUser.email) {
      const emailExists = await this.prisma.usuario.findUnique({
        where: { email: dto.email },
      });

      if (emailExists) {
        throw new BadRequestException('El email ya está en uso');
      }
    }

    // Actualizar usuario
    const updatedUser = await this.prisma.usuario.update({
      where: { id },
      data: dto,
      include: {
        alumno: true,
        profesor: true,
      },
    });

    return {
      ...updatedUser,
      password: undefined,
    };
  }

  // Eliminar usuario
  async remove(id: number) {
    // Verificar que el usuario existe
    const existingUser = await this.prisma.usuario.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }

    // Eliminar usuario
    await this.prisma.usuario.delete({
      where: { id },
    });

    return {
      message: 'Usuario eliminado exitosamente',
    };
  }

  // Cambiar contraseña
  async changePassword(userId: number, dto: ChangePasswordDto) {
    const { currentPassword, newPassword } = dto;

    // Obtener usuario
    const user = await this.prisma.usuario.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Verificar contraseña actual
    const currentHash = Buffer.from(currentPassword).toString('base64');
    if (user.password !== currentHash) {
      throw new UnauthorizedException('Contraseña actual incorrecta');
    }

    // Hashear nueva contraseña
    const newHash = Buffer.from(newPassword).toString('base64');

    // Actualizar contraseña
    await this.prisma.usuario.update({
      where: { id: userId },
      data: { password: newHash },
    });

    return {
      message: 'Contraseña actualizada exitosamente',
    };
  }
}
