import { Injectable, NotFoundException } from '@nestjs/common';
import { BackUpJob } from 'src/modules/backupjob/entities/backupjob.entity';
import { CreateBackupJobDto } from 'src/modules/backupjob/dto/create-backupjob.dto';
import { BackupSchedulerService } from 'src/modules/scheduler/service/backup-scheduler.service';
import { UpdateBackupJobDto } from '../dto/update-backupjob.dto';
import { BackupJobRepository } from '../repository/backupjob.repository';
import { DatabaseConfigService } from 'src/modules/databaseconfig/services/databaseconfig.service';

@Injectable()
export class BackupjobService {
  constructor(
    private readonly backupjobRepository: BackupJobRepository,
    private readonly schedulerService: BackupSchedulerService,
    private readonly databaseconfigService: DatabaseConfigService,
  ) {}

  async create(createbackupjobDto: CreateBackupJobDto) {
    const databaseConfig = await this.databaseconfigService.findOne(
      createbackupjobDto.databaseConfigId,
    );
    const saved = await this.backupjobRepository.create({
      cronExpression: createbackupjobDto.cronExpression,
      retentionDays: createbackupjobDto.retentionDays,
      isActive: createbackupjobDto.isActive,
      databaseConfig,
    });

    const fulljob = await this.findOne(saved.id);
    if (!fulljob?.isActive) {
      throw new NotFoundException('error');
    }

    return fulljob;
  }

  async update(id: number, dto: UpdateBackupJobDto) {
    const job = await this.findOne(id);

    Object.assign(job, dto);

    const saved = await this.backupjobRepository.save(job);

    await this.schedulerService.updateCronJob(saved);

    return saved;
  }

  async findAll() {
    return this.backupjobRepository.findAll();
  }

  async findOne(id: number): Promise<BackUpJob> {
    const job = await this.backupjobRepository.findOne(id);

    if (!job) {
      throw new NotFoundException(`Backup-job ${id} not found`);
    }
    return job;
  }

  async remove(id: number) {
    const job = await this.findOne(id);
    await this.schedulerService.deleteCron(id);
    await this.backupjobRepository.remove(id);
    return job;
  }
}
