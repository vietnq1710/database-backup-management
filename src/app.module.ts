import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseConfigController } from './modules/databaseconfig/databaseconfig.controller';
import { BackupjobController } from './modules/backupjob/backupjob.controller';
import { BackupjobService } from './modules/backupjob/backupjob.service';

@Module({
  imports: [],
  controllers: [AppController, DatabaseConfigController, BackupjobController],
  providers: [AppService, BackupjobService],
})
export class AppModule {}
