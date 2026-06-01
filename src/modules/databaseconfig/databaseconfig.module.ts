import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './entities/databaseconfig.entity';
import { DatabaseConfigController } from './databaseconfig.controller';
import { DatabaseConfigService } from './databaseconfig.service';
@Module({
  imports: [TypeOrmModule.forFeature([DatabaseConfig])],

  controllers: [DatabaseConfigController],

  providers: [DatabaseConfigService],
})
export class databaseconfigModule {}
