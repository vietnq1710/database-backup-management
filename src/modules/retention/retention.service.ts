import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BackUpHistory } from '../backuphistory/entities/backuphistory.entity';
import { Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as fs from 'fs';
@Injectable()
export class RetentionService {
  constructor(
    @InjectRepository(BackUpHistory)
    private readonly repo: Repository<BackUpHistory>,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async cleanupExpiredBackups() {
    console.log('Retention cleanup started');

    const histories = await this.repo.find({
      relations: {
        job: true,
      },
    });

    const now = new Date();

    for (const history of histories) {
      if (!history.job) {
        console.log(`History ${history.id} has no job relation`);
        continue;
      }
      const retentionDays = history.job.retentionDays;

      const expiredAt = new Date(history.endTime);
      //expiredAt.setDate(expiredAt.getDate() + retentionDays);
      expiredAt.setMinutes(expiredAt.getMinutes() + retentionDays);

      if (expiredAt <= now) {
        try {
          if (history.filePath && fs.existsSync(history.filePath)) {
            fs.unlinkSync(history.filePath);

            console.log(`Deleted file ${history.fileName}`);
          }

          await this.repo.delete(history.id);

          console.log(`Deleted history ${history.id}`);
        } catch (error) {
          console.error(`Cleanup failed for history ${history.id}`, error);
        }
      }
    }
  }
}
