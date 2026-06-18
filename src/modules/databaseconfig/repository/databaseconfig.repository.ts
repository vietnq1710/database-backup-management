import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DatabaseConfig } from '../entities/databaseconfig.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DatabaseConfigRepository {
  constructor(
    @InjectRepository(DatabaseConfig)
    private readonly repo: Repository<DatabaseConfig>,
  ) {}

  async create(data: Partial<DatabaseConfig>) {
    return this.repo.save(this.repo.create(data));
  }

  async findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  async update(id: number, data: Partial<DatabaseConfig>) {
    await this.findOne(id);
    await this.repo.update(id, data);

    return await this.findOne(id);
  }

  async remove(id: number) {
    return this.repo.delete(id);
  }
}
