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
import { CreateDatabaseConfigDto } from 'src/modules/databaseconfig/dto/createdatabaseconfig.dto';
import { UpdateDatabaseConfigDto } from 'src/modules/databaseconfig/dto/updatedatabaseconfig.dto';

@Controller('databaseconfig')
export class DatabaseConfigController {
  constructor(private readonly databaseConfigService: DatabaseConfigService) {}

  @Post()
  create(@Body() createDatabaseConfigDto: CreateDatabaseConfigDto) {
    return this.databaseConfigService.create(createDatabaseConfigDto);
  }

  @Get()
  findAll() {
    return this.databaseConfigService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.databaseConfigService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    updatedatabaseconfigDto: UpdateDatabaseConfigDto,
  ) {
    return this.databaseConfigService.update(id, updatedatabaseconfigDto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.databaseConfigService.remove(id);
  }
}
