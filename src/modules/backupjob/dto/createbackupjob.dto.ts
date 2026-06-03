import { ApiProperty } from '@nestjs/swagger';
export class CreateBackupJobDto {
  @ApiProperty({
    example: 'test',
    description: 'Backup Job name',
  })
  name!: string;

  @ApiProperty({
    example: '1',
    description: 'Databaseconfig_Id',
  })
  databaseConfigId!: number;

  @ApiProperty({
    example: '1 * * * * *',
    description: 'Set time for Backupjob',
  })
  cronExpression!: string;

  @ApiProperty({
    example: '1',
    description: 'Set retention time for Backupjob',
  })
  retentionDays!: number;

  @ApiProperty({
    example: 'true',
    description: 'Activate the backupjob',
  })
  isActive!: boolean;
}
