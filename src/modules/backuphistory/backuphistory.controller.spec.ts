import { Test, TestingModule } from '@nestjs/testing';
import { BackuphistoryController } from './backuphistory.controller';

describe('BackuphistoryController', () => {
  let controller: BackuphistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BackuphistoryController],
    }).compile();

    controller = module.get<BackuphistoryController>(BackuphistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
