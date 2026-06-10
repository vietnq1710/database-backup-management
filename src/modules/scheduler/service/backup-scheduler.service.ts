import { Injectable, OnModuleInit } from '@nestjs/common';
import { DatabaseType } from 'src/common/constants/enums/databasetype.enum';
import { BackupjobService } from 'src/modules/backupjob/services/backupjob.service';
import { CronJob } from 'cron';
import { BackupService } from 'src/modules/backupjob/services/backup.service';
import { BackUpHistoryService } from 'src/modules/backuphistory/services/backuphistory.service';
import { SchedulerRegistry } from '@nestjs/schedule';
import { BackUpJob } from 'src/modules/backupjob/entities/backupjob.entity';

@Injectable()
export class BackupSchedulerService implements OnModuleInit {
  constructor(
    private schedulerRegistry: SchedulerRegistry,
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
    //console.log('JOBS DATA:', jobs);

    if (!jobs.length) {
      console.log('No backup jobs found in DB');
    }

    for (const job of jobs) {
      if (job.isActive) {
        this.addCronJob(job);
      }
    }
  }

  async addCronJob(job: BackUpJob) {
    const cronJob = new CronJob(job.cronExpression, async () => {
      console.log(`[${new Date().toISOString()}] running backup job ${job.id}`);
      try {
        const backupResult = await this.backupDb(job.databaseConfig);
        if (!backupResult) {
          console.error('backup result is undefined');
          return;
        }
        await this.backuphistoryService.createHistory(job.id, backupResult);
      } catch (error) {
        console.error(
          `[${new Date().toISOString()}] Backup job ${job.id} failed`,
          error,
        );
      }
    });
    const jobName = `backup-job-${job.id}`;
    this.schedulerRegistry.addCronJob(jobName, cronJob);
    cronJob.start();
    console.log(`Backup job ${job.id} is running`);
  }

  async updateCronJob(job: BackUpJob) {
    this.deleteCron(job);

    if (job.isActive) {
      this.addCronJob(job);
    }
  }

  async deleteCron(job: any) {
    const jobName = `backup-job-${job.id}`;
    if (this.schedulerRegistry.doesExist('cron', jobName)) {
      this.schedulerRegistry.deleteCronJob(jobName);
      console.log(`Deleted cron job: ${jobName}`);
    }
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
