import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { DatabaseConfigService } from './databaseconfig.service';
import { CreateDatabaseConfigDto } from './dto/createdatabaseconfig.dto';

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

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.databaseConfigService.remove(id);
  }
}
