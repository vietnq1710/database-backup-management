import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BackUpHistory } from './entities/backuphistory.entity';
import { BackupHistoryController } from './backuphistory.controller';
import { BackUpHistoryService } from './backuphistory.service';

@Module({
  imports: [TypeOrmModule.forFeature([BackUpHistory])],

  controllers: [BackupHistoryController],

  providers: [BackUpHistoryService],
  exports: [BackUpHistoryService],
})
export class BackuphistoryModule {}
