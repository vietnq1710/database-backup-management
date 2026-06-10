import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BackUpJob } from 'src/modules/backupjob/entities/backupjob.entity';
import { Repository } from 'typeorm';
import { CreateBackupJobDto } from 'src/modules/backupjob/dto/create-backupjob.dto';
import { BackupSchedulerService } from 'src/modules/scheduler/service/backup-scheduler.service';
import { UpdateBackupJobDto } from '../dto/update-backupjob.dto';

@Injectable()
export class BackupjobService {
  constructor(
    @InjectRepository(BackUpJob)
    private readonly repo: Repository<BackUpJob>,
    private readonly schedulerService: BackupSchedulerService,
  ) {}

  async create(createbackupjobDto: CreateBackupJobDto) {
    const job = this.repo.create({
      cronExpression: createbackupjobDto.cronExpression,
      retentionDays: createbackupjobDto.retentionDays,
      isActive: createbackupjobDto.isActive,
      databaseConfig: {
        id: createbackupjobDto.databaseConfigId,
      },
    });
    const saved = await this.repo.save(job);
    const fulljob = await this.repo.findOne({
      where: { id: saved.id },
      relations: {
        databaseConfig: true,
      },
    });
    if (!fulljob?.isActive) {
      throw new NotFoundException('error');
    }
    if (fulljob.isActive) {
      await this.schedulerService.addCronJob(fulljob);
    }
    return fulljob;
  }

  async update(id: number, dto: UpdateBackupJobDto) {
    const job = await this.findOne(id);

    Object.assign(job, dto);

    const saved = await this.repo.save(job);

    await this.schedulerService.updateCronJob(saved);

    return saved;
  }

  async findAll() {
    return this.repo.find({
      relations: {
        databaseConfig: true,
      },
    });
  }

  async findOne(id: number): Promise<BackUpJob> {
    const job = await this.repo.findOne({
      where: { id },
      relations: {
        databaseConfig: true,
      },
    });

    if (!job) {
      throw new NotFoundException(`Backup-job ${id} not found`);
    }
    return job;
  }

  async remove(id: number) {
    const job = await this.findOne(id);
    await this.schedulerService.deleteCron(id);
    await this.repo.delete(id);
    return job;
  }
}
