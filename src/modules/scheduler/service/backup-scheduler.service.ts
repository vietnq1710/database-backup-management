import { Injectable, OnModuleInit } from '@nestjs/common';
import { CronJob } from 'cron';
import { BackupService } from 'src/modules/backupjob/services/backup.service';
import { BackUpHistoryService } from 'src/modules/backuphistory/services/backuphistory.service';
import { SchedulerRegistry } from '@nestjs/schedule';
import { BackUpJob } from 'src/modules/backupjob/entities/backupjob.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BackupSchedulerService implements OnModuleInit {
  constructor(
    private schedulerRegistry: SchedulerRegistry,
    @InjectRepository(BackUpJob)
    private readonly backupjobRepo: Repository<BackUpJob>,
    private readonly backupService: BackupService,
    private readonly backuphistoryService: BackUpHistoryService,
  ) {}
  async onModuleInit() {
    await this.initialize();
  }

  async initialize() {
    console.log('BACKUP SCHEDULER');
    const jobs = await this.backupjobRepo.find({
      relations: {
        databaseConfig: true,
      },
    });
    console.log('JOBS LENGTH:', jobs.length);
    //console.log('JOBS DATA:', jobs);
    if (!jobs.length) {
      console.log('No backup jobs found in DB');
    }

    for (const job of jobs) {
      if (job.isActive) {
        await this.addCronJob(job);
      }
    }
  }

  async addCronJob(job: BackUpJob) {
    const jobName = this.getJobName(job.id);
    if (this.schedulerRegistry.doesExist('cron', jobName)) {
      return;
    }
    const cronJob = new CronJob(job.cronExpression, async () => {
      await this.executeJob(job.id);
    });

    this.schedulerRegistry.addCronJob(jobName, cronJob);
    cronJob.start();
    console.log(`Backup job ${job.id} is running`);
  }

  async updateCronJob(job: BackUpJob) {
    await this.deleteCron(job.id);
    if (job.isActive) {
      await this.addCronJob(job);
    }
  }

  async deleteCron(jobId: number) {
    const jobName = this.getJobName(jobId);
    if (this.schedulerRegistry.doesExist('cron', jobName)) {
      this.schedulerRegistry.deleteCronJob(jobName);
      console.log(`Deleted cron job: ${jobName}`);
    }
  }

  private getJobName(jobId: number): string {
    return `backup-job-${jobId}`;
  }

  /*private getAllCron() {
    const jobs = this.schedulerRegistry.getCronJob();
    return [...jobs.keys()];
  }
    */

  private async executeJob(jobId: number) {
    try {
      const job = await this.backupjobRepo.findOne({
        where: {
          id: jobId,
        },
        relations: {
          databaseConfig: true,
        },
      });

      if (!job) {
        console.error(`Backup-job ${jobId} not found `);
        return;
      }

      const result = await this.backupService.backupDb(job.databaseConfig);

      await this.backuphistoryService.createHistory(job.id, result);
    } catch (error) {
      console.error(`[BACKUP JOB ${jobId}] FAILED`, error);
    }
  }
}
