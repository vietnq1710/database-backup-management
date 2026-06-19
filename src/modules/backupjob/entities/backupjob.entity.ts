import { DatabaseConfig } from '../../databaseconfig/entities/databaseconfig.entity';
import { BackUpHistory } from '../../backuphistory/entities/backuphistory.entity';
import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class BackUpJob {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  cronExpression!: string;

  @Column()
  retentionDays!: number;

  @Column({ default: true })
  isActive!: boolean;

  @ManyToOne(
    () => DatabaseConfig,
    (databaseConfig) => databaseConfig.backupJobs,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'database_config_id' })
  databaseConfig!: DatabaseConfig;

  @OneToMany(() => BackUpHistory, (history) => history.job)
  histories!: BackUpHistory[];
}
