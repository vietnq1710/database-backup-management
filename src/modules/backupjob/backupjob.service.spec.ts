import { Test, TestingModule } from '@nestjs/testing';
import { BackupjobService } from './backupjob.service';

describe('BackupjobService', () => {
  let service: BackupjobService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BackupjobService],
    }).compile();

    service = module.get<BackupjobService>(BackupjobService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
