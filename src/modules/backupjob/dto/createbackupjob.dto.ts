export class CreateBackupJobDto {
  name!: string;

  databaseConfigId!: number;

  cronExpression!: string;

  retentionDays!: number;

  isActive!: boolean;
}
