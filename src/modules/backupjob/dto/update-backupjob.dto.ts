import { CreateBackupJobDto } from './create-backupjob.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateBackupJobDto extends PartialType(CreateBackupJobDto) {}
