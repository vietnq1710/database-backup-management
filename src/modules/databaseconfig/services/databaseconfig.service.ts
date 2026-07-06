import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDatabaseConfigDto } from 'src/modules/databaseconfig/dto/create-databaseconfig.dto';
import { UpdateDatabaseConfigDto } from 'src/modules/databaseconfig/dto/update-databaseconfig.dto';
import { DatabaseConfigRepository } from '../repository/databaseconfig.repository';
import { encryptPassword, decryptPassword } from '../common/utils/crypto.util';

@Injectable()
export class DatabaseConfigService {
  constructor(
    private readonly databaseconfigRepository: DatabaseConfigRepository,
  ) {}

  async create(dto: CreateDatabaseConfigDto) {
    const encrypted_password = encryptPassword(dto.password);

    const saved = await this.databaseconfigRepository.save({
      name: dto.name,
      type: dto.type,
      host: dto.host,
      port: dto.port,
      databaseName: dto.databaseName,
      username: dto.username,
      password: encrypted_password,
    });

    return this.stripPassword(saved);
  }

  async getDecryptedCredential(id: number) {
    const config = await this.findOneRaw(id);
    return {
      user: config.username,
      password: decryptPassword(config.password),
      host: config.host,
    };
  }

  async findAll() {
    const configs = await this.databaseconfigRepository.findAll();
    return configs.map((config) => this.stripPassword(config));
  }

  async findOne(id: number) {
    const config = await this.findOneRaw(id);
    return this.stripPassword(config);
  }

  async update(id: number, dto: UpdateDatabaseConfigDto) {
    const config = await this.findOneRaw(id);

    const { password, ...rest } = dto;
    Object.assign(config, rest);

    if (password) {
      config.password = encryptPassword(password);
    }

    const saved = await this.databaseconfigRepository.save(config);
    return this.stripPassword(saved);
  }

  async remove(id: number) {
    await this.findOneRaw(id);
    return this.databaseconfigRepository.delete(id);
  }

  private async findOneRaw(id: number) {
    const config = await this.databaseconfigRepository.findOne({
      where: { id },
    });
    if (!config) {
      throw new NotFoundException(`Database configuration ${id} not found`);
    }
    return config;
  }

  private stripPassword<T extends { password?: string }>(
    entity: T,
  ): Omit<T, 'password'> {
    const { password, ...safe } = entity;
    return safe;
  }
}
