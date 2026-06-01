import { PartialType } from '@nestjs/mapped-types';
import { CreateDatabaseConfigDto } from './createdatabaseconfig.dto';

export class UpdateDatabaseConfigDto extends PartialType(
  CreateDatabaseConfigDto,
) {}
