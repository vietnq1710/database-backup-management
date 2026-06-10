import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BackUpHistory } from '../backuphistory/entities/backuphistory.entity';
import { RetentionService } from './service/retention-scheduler.service';
import { BackUpJob } from '../backupjob/entities/backupjob.entity';
import { BackupSchedulerService } from './service/backup-scheduler.service';
import { BackupService } from '../backupjob/services/backup.service';
import { BackuphistoryModule } from '../backuphistory/backuphistory.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([BackUpHistory]),
    TypeOrmModule.forFeature([BackUpJob]),
    BackuphistoryModule,
  ],
  providers: [RetentionService, BackupSchedulerService, BackupService],
  exports: [RetentionService, BackupSchedulerService],
})
export class SchedulerModule {}
