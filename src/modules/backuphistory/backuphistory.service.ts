import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BackUpHistory } from './entities/backuphistory.entity';
import { Repository } from 'typeorm';
import { BackUpJob } from '../backupjob/entities/backupjob.entity';

@Injectable()
export class BackUpHistoryService {
  constructor(
    @InjectRepository(BackUpHistory)
    private readonly repo: Repository<BackUpHistory>,
  ) {}

  async createHistory(jobId: number, backupResult: any) {
    const JOB = { id: jobId } as BackUpJob;
    const history = this.repo.create({
      job: JOB,
      fileName: backupResult.fileName,
      filePath: backupResult.filePath,

      status: backupResult.result.status,

      startTime: backupResult.result.startTime,

      endTime: backupResult.result.endTime,

      log: backupResult.result.stderr || backupResult.result.stdout || '',
    });

    return this.repo.save(history);
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
