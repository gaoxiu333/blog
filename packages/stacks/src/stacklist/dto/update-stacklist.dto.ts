import { PartialType } from '@nestjs/mapped-types';
import { CreateStacklistDto } from './create-stacklist.dto';

export class UpdateStacklistDto extends PartialType(CreateStacklistDto) {}
