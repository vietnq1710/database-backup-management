import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './entities/databaseconfig.entity';
import { DatabaseConfigController } from 'src/modules/databaseconfig/controllers/databaseconfig.controller';
import { DatabaseConfigService } from 'src/modules/databaseconfig/services/databaseconfig.service';
@Module({
  imports: [TypeOrmModule.forFeature([DatabaseConfig])],

  controllers: [DatabaseConfigController],

  providers: [DatabaseConfigService],
})
export class databaseconfigModule {}
