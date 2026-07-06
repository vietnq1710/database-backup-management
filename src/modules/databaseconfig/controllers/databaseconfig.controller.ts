import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { DatabaseConfigService } from 'src/modules/databaseconfig/services/databaseconfig.service';
import { CreateDatabaseConfigDto } from 'src/modules/databaseconfig/dto/create-databaseconfig.dto';
import { UpdateDatabaseConfigDto } from 'src/modules/databaseconfig/dto/update-databaseconfig.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('databaseconfig')
export class DatabaseConfigController {
  constructor(private readonly databaseConfigService: DatabaseConfigService) {}

  @Post()
  @ApiOperation({
    summary: 'Create databaseconfig',
    description:
      'Create a new database configuration for database backup operations',
  })
  create(@Body() createDatabaseConfigDto: CreateDatabaseConfigDto) {
    return this.databaseConfigService.create(createDatabaseConfigDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all databaseconfigurations' })
  findAll() {
    return this.databaseConfigService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find databaseconfiguration by id' })
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.databaseConfigService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update databaseconfiguration' })
  update(
    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    updatedatabaseconfigDto: UpdateDatabaseConfigDto,
  ) {
    return this.databaseConfigService.update(id, updatedatabaseconfigDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete databaseconfiguration by id' })
  remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.databaseConfigService.remove(id);
  }

  @Get(':id/test-decrypt')
  async testDecrypt(@Param('id', ParseIntPipe) id: number) {
    return this.databaseConfigService.getDecryptedCredential(id);
  }
}
