import { Test, TestingModule } from '@nestjs/testing';
import { BackuphistoryService } from './backuphistory.service';

describe('BackuphistoryService', () => {
  let service: BackuphistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BackuphistoryService],
    }).compile();

    service = module.get<BackuphistoryService>(BackuphistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
