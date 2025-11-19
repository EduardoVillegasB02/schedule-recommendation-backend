import { PartialType } from '@nestjs/mapped-types';
import { CreateRelativoDto } from './create-relativo.dto';

export class UpdateRelativoDto extends PartialType(CreateRelativoDto) {}
