import { Test, TestingModule } from '@nestjs/testing';
import { BackupjobController } from './backupjob.controller';

describe('BackupjobController', () => {
  let controller: BackupjobController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BackupjobController],
    }).compile();

    controller = module.get<BackupjobController>(BackupjobController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
