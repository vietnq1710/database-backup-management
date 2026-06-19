import {
  Column,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Status } from '../../../common/constants/enums/statustype.enum';
import { BackUpJob } from '../../backupjob/entities/backupjob.entity';

@Entity()
export class BackUpHistory {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => BackUpJob, (job) => job.histories, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'backupJobId' })
  job!: BackUpJob;

  @Column()
  fileName!: string;

  @Column()
  filePath!: string;

  @Column({ type: 'enum', enum: Status })
  status!: Status;

  @Column({ type: 'timestamp' })
  startTime!: Date;

  @Column({ type: 'timestamp' })
  endTime!: Date;

  @Column({
    type: 'json',
    nullable: true,
  })
  log!: {
    stdout: string;
    stderr: string;
  };
}
