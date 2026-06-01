import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseconfigControllerController } from './databaseconfig.controller/databaseconfig.controller.controller';

@Module({
  imports: [],
  controllers: [AppController, DatabaseconfigControllerController],
  providers: [AppService],
})
export class AppModule {}
