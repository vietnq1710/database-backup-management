import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BackUpJob } from '../entities/backupjob.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BackupJobRepository {
  constructor(
    @InjectRepository(BackUpJob)
    private readonly repo: Repository<BackUpJob>,
  ) {}

  async create(data: Partial<BackUpJob>) {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async save(job: BackUpJob) {
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
    return this.repo.findOne({
      where: { id },
      relations: {
        databaseConfig: true,
      },
    });
  }

  async remove(id: number) {
    const job = await this.findOne(id);

    await this.repo.delete(id);

    return job;
  }
}
