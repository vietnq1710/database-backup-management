import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BackUpHistory } from './entities/backuphistory.entity';
import { BackupHistoryController } from 'src/modules/backuphistory/controllers/backuphistory.controller';
import { BackUpHistoryService } from 'src/modules/backuphistory/services/backuphistory.service';
import { RetentionService } from '../scheduler/service/retention-scheduler.service';

@Module({
  imports: [TypeOrmModule.forFeature([BackUpHistory])],

  controllers: [BackupHistoryController],

  providers: [BackUpHistoryService, RetentionService],
  exports: [BackUpHistoryService],
})
export class BackuphistoryModule {}
