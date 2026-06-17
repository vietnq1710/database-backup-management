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
import { CreateBackupJobDto } from 'src/modules/backupjob/dto/create-backupjob.dto';
import { UpdateBackupJobDto } from 'src/modules/backupjob/dto/update-backupjob.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('backupjob')
export class BackupjobController {
  constructor(private readonly backupjobService: BackupjobService) {}

  @ApiOperation({
    summary: 'Create backup schedule',
    description: 'Create a scheduled task for automatic database backups.',
  })
  @Post()
  create(@Body() createbackupjobDto: CreateBackupJobDto) {
    return this.backupjobService.create(createbackupjobDto);
  }

  @ApiOperation({
    summary: 'Find all backup schedules',
  })
  @Get()
  findAll() {
    return this.backupjobService.findAll();
  }

  @ApiOperation({
    summary: 'Find backup schedule by id',
  })
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.backupjobService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update backup schedule',
  })
  @Put(':id')
  update(
    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    updatebackupjobDto: UpdateBackupJobDto,
  ) {
    return this.backupjobService.update(id, updatebackupjobDto);
  }

  @ApiOperation({
    summary: 'Delete backup schedule',
  })
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.backupjobService.remove(id);
  }
}
