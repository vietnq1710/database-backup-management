import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { BackupjobController } from './backupjob.controller';
import { BackupjobService } from './backupjob.service';
import { BackupSchedulerService } from './backupscheduler.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BackUpJob } from './entities/backupjob.entity';
import { BackupService } from 'src/modules/backupjob/backup.service';
import { BackuphistoryModule } from '../backuphistory/backuphistory.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([BackUpJob]),
    BackuphistoryModule,
  ],
  controllers: [BackupjobController],
  providers: [BackupjobService, BackupSchedulerService, BackupService],
})
export class BackupJobModule {}
