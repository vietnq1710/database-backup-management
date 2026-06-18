import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDatabaseConfigDto } from 'src/modules/databaseconfig/dto/create-databaseconfig.dto';
import { UpdateDatabaseConfigDto } from 'src/modules/databaseconfig/dto/update-databaseconfig.dto';
import { DatabaseConfigRepository } from '../repository/databaseconfig.repository';
@Injectable()
export class DatabaseConfigService {
  constructor(
    private readonly databaseconfigRepository: DatabaseConfigRepository,
  ) {}

  async create(createdatabaseconfigDto: CreateDatabaseConfigDto) {
    return this.databaseconfigRepository.create(createdatabaseconfigDto);
  }

  async findAll() {
    return this.databaseconfigRepository.findAll();
  }

  async findOne(id: number) {
    const config = await this.databaseconfigRepository.findOne({
      where: { id },
    });
    if (!config) {
      throw new NotFoundException(`Database configuration ${id} not found`);
    }
    return config;
  }

  async update(id: number, updatedatabaseconfigDto: UpdateDatabaseConfigDto) {
    const config = await this.findOne(id);

    Object.assign(config, updatedatabaseconfigDto);

    return this.databaseconfigRepository.save(config);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.databaseconfigRepository.remove(id);
  }
}
