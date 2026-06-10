import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DatabaseConfig } from 'src/modules/databaseconfig/entities/databaseconfig.entity';
import { Repository } from 'typeorm';
import { CreateDatabaseConfigDto } from 'src/modules/databaseconfig/dto/create-databaseconfig.dto';
import { UpdateDatabaseConfigDto } from 'src/modules/databaseconfig/dto/update-databaseconfig.dto';
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

  async update(id: number, updatedatabaseconfigDto: UpdateDatabaseConfigDto) {
    await this.findOne(id);
    await this.repo.update(id, updatedatabaseconfigDto);

    return await this.findOne(id);
  }

  async remove(id: number) {
    return this.repo.delete(id);
  }
}
