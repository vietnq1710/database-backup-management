import { PartialType } from '@nestjs/mapped-types';
import { CreateDatabaseConfigDto } from './create-databaseconfig.dto';

export class UpdateDatabaseConfigDto extends PartialType(
  CreateDatabaseConfigDto,
) {}
