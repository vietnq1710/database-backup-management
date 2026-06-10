import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BackUpHistory } from 'src/modules/backuphistory/entities/backuphistory.entity';
import { BackUpJob } from 'src/modules/backupjob/entities/backupjob.entity';
import { Repository } from 'typeorm';
//import { Status } from 'src/common/constants/enums/statustype.enum';
//import { BackUpJob } from 'src/modules/backupjob/entities/backupjob.entity';
//import { DeepPartial } from 'typeorm';
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
  /*async createHistory(jobId: number, backupResult: any) {
    const history = this.repo.create({
      job: { id: jobId } as DeepPartial<BackUpJob>,

      fileName: backupResult.fileName,
      filePath: backupResult.filePath,

      status: backupResult.code === 0 ? Status.SUCCESS : Status.FAILED,

      startTime: backupResult.startTime,
      endTime: backupResult.endTime,

      log: {
        stdout: backupResult.stdout ?? '',
        stderr: backupResult.stderr ?? '',
      },
    });

    return this.repo.save(history);
  }
    */

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
