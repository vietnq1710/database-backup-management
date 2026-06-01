import { CreateBackupJobDto } from './createbackupjob.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateBackupJobDto extends PartialType(CreateBackupJobDto) {}
