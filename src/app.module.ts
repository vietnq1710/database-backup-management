import { Module } from '@nestjs/common';
//import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { databaseconfigModule } from './modules/databaseconfig/databaseconfig.module';
import { BackupJobModule } from './modules/backupjob/backupjob.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BackuphistoryModule } from './modules/backuphistory/backuphistory.module';
import { RetentionModule } from './modules/retention/retention.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    databaseconfigModule,
    BackupJobModule,
    BackuphistoryModule,
    RetentionModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,

      username: 'postgres',
      password: 'Vietdeptrai2003',

      database: 'backup',

      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  //controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
