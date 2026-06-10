import { DatabaseType } from 'src/common/constants/enums/databasetype.enum';
import { ApiProperty } from '@nestjs/swagger';
export class CreateDatabaseConfigDto {
  @ApiProperty({
    example: 'test',
    description: 'Config name',
  })
  name!: string;

  @ApiProperty({
    example: 'postgres / mongo',
    description: 'type of database',
  })
  type!: DatabaseType;

  @ApiProperty({
    example: 'localhost / nguyenquocviet.88zs26x.mongodb.net',
    description: 'Host',
  })
  host!: string;

  @ApiProperty({
    example: '5432 / 27017',
    description: 'Port',
  })
  port!: number;

  @ApiProperty({
    example: 'User / sample_mflix',
    description: 'Database name',
  })
  databaseName!: string;

  @ApiProperty({
    example: 'postgres / vietreborn',
    description: 'Username',
  })
  username!: string;

  @ApiProperty({
    example: '123456',
    description: 'Password',
  })
  password!: string;
}
