import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { executeOS } from 'src/common/utils/executeos.utils';
import { DatabaseConfig } from 'src/modules/databaseconfig/entities/databaseconfig.entity';
@Injectable()
export class BackupService {
  constructor(private readonly configService: ConfigService) {}

  async backupPostgresDb(db: DatabaseConfig) {
    const backupRoot = this.configService.get<string>('backup.rootPath');
    const pgDumpPath = this.configService.get<string>(
      'backup.postgresDumpPath',
    );

    const fileName = `${db.databaseName}_${Date.now()}.sql`;
    const filePath = `${backupRoot}/${fileName}`;

    const command =
      `"${pgDumpPath}" ` +
      `-U ${db.username} ` +
      `-h ${db.host} ` +
      `-p ${db.port} ` +
      `${db.databaseName} ` +
      `-f "${filePath}"`;

    const result = await executeOS(command, {
      PGPASSWORD: db.password,
    });
    console.log(`Backup completed: ${filePath}`);
    return {
      fileName,
      filePath,
      result,
    };
  }

  async backupMongoDb(db: DatabaseConfig) {
    const backupRoot = this.configService.get<string>('backup.rootPath');

    const mongodumpPath = this.configService.get<string>(
      'backup.mongoDumpPath',
    );
    const fileName = `mongo_${db.databaseName}_${Date.now()}`;
    const filePath = `${backupRoot}/${fileName}`;

    const uri =
      `mongodb+srv://${db.username}:${db.password}` +
      `@${db.host}/${db.databaseName}`;

    const command =
      `"${mongodumpPath}" ` +
      `--uri="${uri}" ` +
      `--out="${filePath}" ` +
      `--gzip`;
    console.log('COMMAND =', command);
    const result = await executeOS(command);
    console.log(`Backup completed: ${filePath}`);
    return {
      fileName,
      filePath,
      result,
    };
  }
}
