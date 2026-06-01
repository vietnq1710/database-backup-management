import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseconfigService } from './databaseconfig.service';

describe('DatabaseconfigService', () => {
  let service: DatabaseconfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseconfigService],
    }).compile();

    service = module.get<DatabaseconfigService>(DatabaseconfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
