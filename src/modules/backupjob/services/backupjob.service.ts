import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BackUpJob } from 'src/modules/backupjob/entities/backupjob.entity';
import { Repository } from 'typeorm';
import { CreateBackupJobDto } from 'src/modules/backupjob/dto/createbackupjob.dto';
import { UpdateBackupJobDto } from 'src/modules/backupjob/dto/updatebackupjob.dto';

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

  async update(id: number, updatebackupjobDto: UpdateBackupJobDto) {
    await this.findOne(id);
    await this.repo.update(id, updatebackupjobDto);
    return await this.findOne(id);
  }

  async remove(id: number) {
    return this.repo.delete(id);
  }
}
