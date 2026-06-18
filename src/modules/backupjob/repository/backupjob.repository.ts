import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BackUpJob } from '../entities/backupjob.entity';
import { Repository } from 'typeorm';
import { BaseRepository } from 'src/common/repositories/base.repository';

@Injectable()
export class BackupJobRepository extends BaseRepository<BackUpJob> {
  constructor(
    @InjectRepository(BackUpJob)
    repo: Repository<BackUpJob>,
  ) {
    super(repo);
  }

  async findAll() {
    return this.repository.find({
      relations: {
        databaseConfig: true,
      },
    });
  }

  async findOneWithConfig(id: number) {
    return this.repository.findOne({
      where: { id },
      relations: {
        databaseConfig: true,
      },
    });
  }
}
