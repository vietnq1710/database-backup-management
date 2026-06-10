import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BackUpHistory } from '../backuphistory/entities/backuphistory.entity';
import { RetentionService } from './service/retention-scheduler.service';

@Module({
  imports: [TypeOrmModule.forFeature([BackUpHistory])],
  providers: [RetentionService],
})
export class RetentionModule {}
