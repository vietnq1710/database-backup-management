import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BackUpJob } from 'src/modules/backupjob/entities/backupjob.entity';
import { Repository } from 'typeorm';
import { CreateBackupJobDto } from 'src/modules/backupjob/dto/create-backupjob.dto';

@Injectable()
export class BackupjobService {
  constructor(
    @InjectRepository(BackUpJob)
    private repo: Repository<BackUpJob>,
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
    return this.repo.save(job);
  }

  async findAll() {
    return this.repo.find({
      relations: {
        databaseConfig: true,
      },
    });
  }

  async findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  async remove(id: number) {
    await this.repo.delete(id);
  }
}
