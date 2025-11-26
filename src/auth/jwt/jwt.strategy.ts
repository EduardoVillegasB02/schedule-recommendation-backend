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
    const { sub, email, rol } = payload;
    
    // Buscar el usuario en la tabla usuario
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: parseInt(sub) },
      include: {
        alumno: true,
        profesor: true,
      },
    });

    if (!usuario) {
      throw new UnauthorizedException('Sesión finalizada, vuelva a ingresar');
    }

    return {
      sub: usuario.id,
      user_id: usuario.id,
      email: usuario.email,
      rol: usuario.rol,
      alumno: usuario.alumno,
      profesor: usuario.profesor,
    };
  }
}
