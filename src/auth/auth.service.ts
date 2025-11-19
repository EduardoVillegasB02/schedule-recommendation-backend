import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto';
import { JwtPayload } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async login(dto: LoginDto) {
    const { codigo } = dto;
    const alumno = await this.prisma.alumno.findUnique({
      where: { codigo },
    });
    const profesor = await this.prisma.profesor.findUnique({
      where: { codigo_profesor: codigo },
    });
    if (!alumno && !profesor)
      throw new UnauthorizedException('Credenciales inválidas');
    const token = await this.getJwtToken({ sub: codigo });
    if (alumno)
      await this.prisma.alumno.update({
        data: { token },
        where: { codigo },
      });
    else
      await this.prisma.profesor.update({
        data: { token },
        where: { codigo_profesor: codigo },
      });
    return {
      rol: alumno ? 'ALUMNO' : 'PROFESOR',
      user: codigo,
      token,
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

  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.signAsync(payload);
  }
}
