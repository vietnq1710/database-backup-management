import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { DatabaseType } from 'src/common/constants/enums/databasetype.enum';
import { BackUpJob } from 'src/modules/backupjob/entities/backupjob.entity';

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

  @OneToMany(() => BackUpJob, (backupJob) => backupJob.databaseConfig)
  backupJobs!: BackUpJob[];
}
