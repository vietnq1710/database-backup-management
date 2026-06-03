import { BackUpHistory } from 'src/modules/backuphistory/entities/backuphistory.entity';
import { DatabaseConfig } from 'src/modules/databaseconfig/entities/databaseconfig.entity';
import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
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
  @JoinColumn({ name: 'databaseConfigId' })
  databaseConfig!: DatabaseConfig;
}
