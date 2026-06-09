import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Delete,
  Put,
} from '@nestjs/common';
import { BackupjobService } from 'src/modules/backupjob/services/backupjob.service';
import { CreateBackupJobDto } from 'src/modules/backupjob/dto/createbackupjob.dto';
import { UpdateBackupJobDto } from 'src/modules/backupjob/dto/updatebackupjob.dto';

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

  @Put(':id')
  update(
    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    updatebackupjobDto: UpdateBackupJobDto,
  ) {
    return this.backupjobService.update(id, updatebackupjobDto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.backupjobService.remove(id);
  }
}
