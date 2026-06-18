import { Injectable, NotFoundException } from '@nestjs/common';
import { BackUpJob } from 'src/modules/backupjob/entities/backupjob.entity';
import { BackupHistoryRepository } from '../repository/backuphistory.repository';
@Injectable()
export class BackUpHistoryService {
  constructor(
    private readonly backuphistoryRepository: BackupHistoryRepository,
  ) {}

  async createHistory(jobId: number, backupResult: any) {
    return this.backuphistoryRepository.create({
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
  }

  async findAll() {
    return this.backuphistoryRepository.findAll();
  }

  async findOne(id: number) {
    const history = await this.backuphistoryRepository.findOne(id);
    if (!history) {
      throw new NotFoundException(`Backup history ${id} not found`);
    }
    return history;
  }
}
