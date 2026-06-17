import { Module } from '@nestjs/common';
//import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { databaseconfigModule } from './modules/databaseconfig/databaseconfig.module';
import { BackupJobModule } from './modules/backupjob/backupjob.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BackuphistoryModule } from './modules/backuphistory/backuphistory.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import backupConfig from './config/backup.config';
import databaseConfig from './config/database.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, backupConfig],
    }),
    ScheduleModule.forRoot(),
    databaseconfigModule,
    BackupJobModule,
    BackuphistoryModule,

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('database.host'),
        port: config.get('database.port'),
        username: config.get('database.username'),
        password: config.get('database.password'),
        database: config.get('database.name'),
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
  ],
  //controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
