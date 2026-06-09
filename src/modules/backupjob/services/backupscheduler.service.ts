import { Injectable, OnModuleInit } from '@nestjs/common';
import { DatabaseType } from 'src/common/constants/enums/databasetype.enum';
import { BackupjobService } from './backupjob.service';
import { CronJob } from 'cron';
import { BackupService } from 'src/modules/backupjob/services/backup.service';
import { BackUpHistoryService } from 'src/modules/backuphistory/services/backuphistory.service';

@Injectable()
export class BackupSchedulerService implements OnModuleInit {
  private jobsMap = new Map<number, CronJob>();
  constructor(
    private readonly backupjobService: BackupjobService,
    private readonly backupService: BackupService,
    private readonly backuphistoryService: BackUpHistoryService,
  ) {}
  async onModuleInit() {
    console.log('testing');
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

  createCronJob(job: any) {
    const cronJob = new CronJob(job.cronExpression, async () => {
      console.log(`[${new Date().toISOString()}] running backup job ${job.id}`);
      try {
        const backupResult = await this.backupDb(job.databaseConfig);

        await this.backuphistoryService.createHistory(job.id, backupResult);
      } catch (error) {
        console.error(
          `[${new Date().toISOString()}] Backup job ${job.id} failed`,
          error,
        );
      }
    });
    cronJob.start();
    this.jobsMap.set(job.id, cronJob);
    console.log(`Backup job ${job.id} is running`);
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
