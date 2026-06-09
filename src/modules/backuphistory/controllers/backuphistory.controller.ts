import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { BackUpHistoryService } from 'src/modules/backuphistory/services/backuphistory.service';

@Controller('backuphistory')
export class BackupHistoryController {
  constructor(private readonly backuphistoryService: BackUpHistoryService) {}

  @Get('findall')
  findAll() {
    return this.backuphistoryService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.backuphistoryService.findOne(id);
  }
}
