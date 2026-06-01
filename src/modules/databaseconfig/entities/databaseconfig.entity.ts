import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DatabaseType } from 'src/common/enums/databasetype.enum';

@Entity()
export class DatabaseConfig {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({
    type: 'enum',
    enum: DatabaseType,
  })
  type!: DatabaseType;

  @Column()
  host!: string;

  @Column()
  port!: number;

  @Column()
  databaseName!: string;

  @Column()
  username!: string;

  @Column()
  password!: string;
}
