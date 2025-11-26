import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AlumnoModule } from './modules/alumno/alumno.module';
import { CreditoModule } from './modules/credito/credito.module';
import { CursoModule } from './modules/curso/curso.module';
import { DemandaModule } from './modules/demanda/demanda.module';
import { MatriculaModule } from './modules/matricula/matricula.module';
import { ProfesorModule } from './modules/profesor/profesor.module';
import { OfertadoModule } from './modules/ofertado/ofertado.module';
import { RelativoModule } from './modules/relativo/relativo.module';
import { RequisitoModule } from './modules/requisito/requisito.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AlumnoModule,
    CreditoModule,
    CursoModule,
    DemandaModule,
    MatriculaModule,
    ProfesorModule,
    OfertadoModule,
    RelativoModule,
    RequisitoModule,
    AuthModule,
    UsersModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
