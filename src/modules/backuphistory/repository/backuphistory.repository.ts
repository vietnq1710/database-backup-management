import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BackUpHistory } from '../entities/backuphistory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BackupHistoryRepository {
  constructor(
    @InjectRepository(BackUpHistory)
    private readonly repo: Repository<BackUpHistory>,
  ) {}

  async create(data: Partial<BackUpHistory>) {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async findAll() {
    return this.repo.find({
      order: {
        startTime: 'DESC',
      },
    });
  }

  async findOne(id: number) {
    return this.repo.findOne({
      where: { id },
    });
  }
}
