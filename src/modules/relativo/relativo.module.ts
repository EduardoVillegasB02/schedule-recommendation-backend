import { Module } from '@nestjs/common';
import { RelativoService } from './relativo.service';
import { RelativoController } from './relativo.controller';

@Module({
  controllers: [RelativoController],
  providers: [RelativoService],
})
export class RelativoModule {}
