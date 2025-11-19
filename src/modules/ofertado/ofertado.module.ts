import { Module } from '@nestjs/common';
import { OfertadoService } from './ofertado.service';
import { OfertadoController } from './ofertado.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [OfertadoController],
  providers: [OfertadoService, PrismaService],
})
export class OfertadoModule {}
