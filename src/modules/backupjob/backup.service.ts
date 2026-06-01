import { Injectable } from '@nestjs/common';
import { executeOS } from 'src/common/utils/execute.os.utils';
@Injectable()
export class BackupService {
  async backupPostgresDb(db: any) {
    const fileName = `backup_${Date.now()}.sql`;
    const filePath = `/backups/${fileName}`;

    const command = `pg_dump -U ${db.username} -h ${db.host} -p ${db.port} ${db.databaseName} -f ${filePath}`;

    return {
      fileName,
      filePath,
      result: await executeOS(command),
    };
  }

  async backupMongoDb(db: any) {
    const fileName = `mongo_${Date.now()}`;
    const filePath = `/backups/${fileName}`;

    const command = `mongodump --uri="${db.connectionString}" --out=${filePath} --gzip`;

    return {
      fileName,
      filePath,
      result: await executeOS(command),
    };
  }
}
