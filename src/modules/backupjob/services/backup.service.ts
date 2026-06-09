import { Injectable } from '@nestjs/common';
import { executeOS } from 'src/common/utils/executeos.utils';
import { DatabaseConfig } from 'src/modules/databaseconfig/entities/databaseconfig.entity';
@Injectable()
export class BackupService {
  async backupPostgresDb(db: DatabaseConfig) {
    const fileName = `${db.databaseName}_${Date.now()}.sql`;
    const filePath = `./backups/${fileName}`;

    const command =
      `"G:\\PostgreSQL\\bin\\pg_dump.exe" ` +
      `-U ${db.username} ` +
      `-h ${db.host} ` +
      `-p ${db.port} ` +
      `${db.databaseName} ` +
      `-f "${filePath}"`;

    console.log(`Backup completed: ${filePath}`);
    return {
      fileName,
      filePath,
      result: await executeOS(command, {
        PGPASSWORD: db.password,
      }),
    };
  }

  async backupMongoDb(db: DatabaseConfig) {
    const fileName = `mongo_${db.databaseName}_${Date.now()}`;
    const filePath = `./backups/${fileName}`;

    const mongodumpPath = 'G:\\MONGODB_TOOLS\\bin\\mongodump.exe';

    const uri =
      `mongodb+srv://${db.username}:${db.password}` +
      `@${db.host}/${db.databaseName}`;

    const command =
      `"${mongodumpPath}" ` +
      `--uri="${uri}" ` +
      `--out="${filePath}" ` +
      `--gzip`;

    console.log(`Backup completed: ${filePath}`);
    return {
      fileName,
      filePath,
      result: await executeOS(command),
    };
  }
}
