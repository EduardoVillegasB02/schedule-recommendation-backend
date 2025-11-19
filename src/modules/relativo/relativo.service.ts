import { Injectable } from '@nestjs/common';
import { CreateRelativoDto } from './dto/create-relativo.dto';
import { UpdateRelativoDto } from './dto/update-relativo.dto';

@Injectable()
export class RelativoService {
  create(createRelativoDto: CreateRelativoDto) {
    return 'This action adds a new relativo';
  }

  findAll() {
    return `This action returns all relativo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} relativo`;
  }

  update(id: number, updateRelativoDto: UpdateRelativoDto) {
    return `This action updates a #${id} relativo`;
  }

  remove(id: number) {
    return `This action removes a #${id} relativo`;
  }
}
