import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtPayload } from '../interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      secretOrKey: config.get<string>('JWT_SECRET') as string,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload) {
    const { sub } = payload;
    const alumno = await this.prisma.alumno.findUnique({
      select: { codigo: true },
      where: { codigo: sub },
    });
    const profesor = await this.prisma.profesor.findUnique({
      where: { codigo_profesor: sub },
    });
    if (!alumno && !profesor)
      throw new UnauthorizedException('Sesión finalizada, vuelva a ingresar');
    return {
      user_id: sub,
      rol: alumno ? 'ALUMNO' : 'PROFESOR',
    };
  }
}
