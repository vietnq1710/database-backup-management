import { DatabaseType } from 'src/common/enums/databasetype.enum';

export class CreateDatabaseConfigDto {
  name!: string;
  type!: DatabaseType;
  host!: string;
  port!: number;
  databasename!: string;
  username!: string;
  password!: string;
}
