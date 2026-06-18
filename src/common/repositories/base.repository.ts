import {
  DeepPartial,
  FindManyOptions,
  Repository,
  FindOneOptions,
  ObjectLiteral,
} from 'typeorm';

export abstract class BaseRepository<T extends ObjectLiteral> {
  constructor(protected readonly repository: Repository<T>) {}

  create(entity: DeepPartial<T>) {
    return this.repository.save(this.repository.create(entity));
  }

  save(entity: DeepPartial<T>) {
    return this.repository.save(this.repository.create(entity));
  }

  findAll(options?: FindManyOptions<T>) {
    return this.repository.find(options);
  }

  findOne(options: FindOneOptions<T>) {
    return this.repository.findOne(options);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
