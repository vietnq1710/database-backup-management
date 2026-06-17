import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BackUpHistory } from 'src/modules/backuphistory/entities/backuphistory.entity';
import { BackUpJob } from 'src/modules/backupjob/entities/backupjob.entity';
import { Repository } from 'typeorm';
@Injectable()
export class BackUpHistoryService {
  constructor(
    @InjectRepository(BackUpHistory)
    private readonly repo: Repository<BackUpHistory>,
  ) {}

  async createHistory(jobId: number, backupResult: any) {
    const history = this.repo.create({
      job: { id: jobId } as BackUpJob,
      fileName: backupResult.fileName,
      filePath: backupResult.filePath,
      status: backupResult.result.status,
      startTime: backupResult.result.startTime,
      endTime: backupResult.result.endTime,
      log: {
        stdout: backupResult.result.stdout ?? '',
        stderr: backupResult.result.stderr ?? '',
      },
    });
    console.log(`Save History`);
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
    const history = await this.repo.findOne({
      where: { id },
    });

    if (!history) {
      throw new NotFoundException(`Backup history id=${id} not found`);
    }
    return history;
  }
}
