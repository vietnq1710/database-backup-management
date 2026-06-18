import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BackUpHistory } from '../entities/backuphistory.entity';
import { Repository } from 'typeorm';
import { BaseRepository } from 'src/common/repositories/base.repository';

@Injectable()
export class BackupHistoryRepository extends BaseRepository<BackUpHistory> {
  constructor(
    @InjectRepository(BackUpHistory)
    repo: Repository<BackUpHistory>,
  ) {
    super(repo);
  }

  override async findAll() {
    return this.repository.find({
      order: {
        startTime: 'DESC',
      },
    });
  }
}
