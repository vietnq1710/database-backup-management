import { Injectable, OnModuleInit } from '@nestjs/common';
import { DatabaseType } from 'src/common/enums/databasetype.enum';
import { BackupjobService } from './backupjob.service';
import { CronJob } from 'cron';
import { BackupService } from 'src/modules/backupjob/backup.service';
import { BackUpHistoryService } from '../backuphistory/backuphistory.service';

@Injectable()
export class BackupSchedulerService implements OnModuleInit {
  private jobsMap = new Map<number, CronJob>();
  constructor(
    private readonly backupjobService: BackupjobService,
    private readonly backupService: BackupService,
    private readonly backuphistoryService: BackUpHistoryService,
  ) {}
  async onModuleInit() {
    await this.initialize();
  }

  async initialize() {
    console.log('BACKUP SCHEDULER');
    const jobs = await this.backupjobService.findAll();

    console.log('JOBS LENGTH:', jobs.length);
    console.log('JOBS DATA:', jobs);

    if (!jobs.length) {
      console.log('No backup jobs found in DB');
    }

    for (const job of jobs) {
      if (job.isActive) {
        this.createCronJob(job);
      }
    }
  }
  /*
  createCronJob(job: any) {
    const cronJob = new CronJob(job.cronExpression, async () => {
      console.log(`Running backup job: ${job.id}`);
      await this.backupDb(job.databaseConfig);
    });

    cronJob.start();
    this.jobsMap.set(job.id, cronJob);
  }
*/

  createCronJob(job: any) {
    const cronJob = new CronJob(job.cronExpression, async () => {
      try {
        const backupResult = await this.backupDb(job.databaseConfig);

        await this.backuphistoryService.createHistory(job.id, backupResult);
      } catch (error) {
        console.error(error);
      }
    });

    cronJob.start();

    this.jobsMap.set(job.id, cronJob);

    console.log(`Cron job ${job.id} is running`);
  }
  async backupDb(db: any) {
    switch (db.type) {
      case DatabaseType.POSTGRES:
        return this.backupService.backupPostgresDb(db);

      case DatabaseType.MONGO:
        return this.backupService.backupMongoDb(db);

      default:
        throw new Error(`Unsupported database type: ${db.type}`);
    }
  }
}
