import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DatabaseConfig } from './entities/databaseconfig.entity';
import { Repository } from 'typeorm';
import { CreateDatabaseConfigDto } from './dto/createdatabaseconfig.dto';

@Injectable()
export class DatabaseConfigService {
  constructor(
    @InjectRepository(DatabaseConfig)
    private repo: Repository<DatabaseConfig>,
  ) {}

  async create(createdatabaseconfigDto: CreateDatabaseConfigDto) {
    return this.repo.save(this.repo.create(createdatabaseconfigDto));
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
