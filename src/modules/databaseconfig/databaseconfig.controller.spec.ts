import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseconfigController } from './databaseconfig.controller';

describe('DatabaseconfigController', () => {
  let controller: DatabaseconfigController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DatabaseconfigController],
    }).compile();

    controller = module.get<DatabaseconfigController>(DatabaseconfigController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
