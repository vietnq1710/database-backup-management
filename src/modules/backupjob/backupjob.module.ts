import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { BackupjobController } from 'src/modules/backupjob/controllers/backupjob.controller';
import { BackupjobService } from 'src/modules/backupjob/services/backupjob.service';
import { BackupSchedulerService } from 'src/modules/scheduler/service/backup-scheduler.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BackUpJob } from './entities/backupjob.entity';
import { BackupService } from 'src/modules/backupjob/services/backup.service';
import { BackuphistoryModule } from '../backuphistory/backuphistory.module';
import { BackupJobRepository } from './repository/backupjob.repository';
import { databaseconfigModule } from '../databaseconfig/databaseconfig.module';

@Module({
  imports: [
    ScheduleModule,
    TypeOrmModule.forFeature([BackUpJob]),
    BackuphistoryModule,
    databaseconfigModule,
  ],
  controllers: [BackupjobController],
  providers: [
    BackupjobService,
    BackupSchedulerService,
    BackupService,
    BackupJobRepository,
  ],
  exports: [BackupjobService, BackupService],
})
export class BackupJobModule {}
