import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { BackUpHistoryService } from 'src/modules/backuphistory/services/backuphistory.service';

@Controller('backuphistory')
export class BackupHistoryController {
  constructor(private readonly backuphistoryService: BackUpHistoryService) {}

  @ApiOperation({ summary: 'Find all backup histories' })
  @Get('findall')
  findAll() {
    return this.backuphistoryService.findAll();
  }

  @ApiOperation({ summary: 'Find backup history by id' })
  @Get(':id')
  @ApiOkResponse({
    description: `Backup history found`,
  })
  @ApiNotFoundResponse({
    description: `Backup history not found`,
  })
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.backuphistoryService.findOne(id);
  }
}
