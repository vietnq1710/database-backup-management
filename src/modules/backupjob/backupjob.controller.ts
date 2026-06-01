import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { BackupjobService } from './backupjob.service';
import { CreateBackupJobDto } from './dto/createbackupjob.dto';

@Controller('backupjob')
export class BackupjobController {
  constructor(private readonly backupjobService: BackupjobService) {}
  @Post()
  create(@Body() createbackupjobDto: CreateBackupJobDto) {
    return this.backupjobService.create(createbackupjobDto);
  }

  @Get()
  findAll() {
    return this.backupjobService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.backupjobService.findOne(id);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.backupjobService.remove(id);
  }
}
