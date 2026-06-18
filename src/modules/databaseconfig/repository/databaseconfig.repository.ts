import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DatabaseConfig } from '../entities/databaseconfig.entity';
import { Repository } from 'typeorm';
import { BaseRepository } from 'src/common/repositories/base.repository';

@Injectable()
export class DatabaseConfigRepository extends BaseRepository<DatabaseConfig> {
  constructor(
    @InjectRepository(DatabaseConfig)
    repo: Repository<DatabaseConfig>,
  ) {
    super(repo);
  }
}
