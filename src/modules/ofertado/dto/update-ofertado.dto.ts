import { PartialType } from '@nestjs/mapped-types';
import { CreateOfertadoDto } from './create-ofertado.dto';

export class UpdateOfertadoDto extends PartialType(CreateOfertadoDto) {}
