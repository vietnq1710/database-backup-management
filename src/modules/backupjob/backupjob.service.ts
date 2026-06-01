import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BackUpJob } from './entities/backupjob.entity';
import { Repository } from 'typeorm';
import { CreateBackupJobDto } from './dto/createbackupjob.dto';

@Injectable()
export class BackupjobService {
  constructor(
    @InjectRepository(BackUpJob)
    private repo: Repository<BackUpJob>,
  ) {}

  async create(createbackupjobDto: CreateBackupJobDto) {
    return this.repo.save(this.repo.create(createbackupjobDto));
  }

  async findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  async remove(id: number) {
    return this.repo.delete(id);
  }
}
