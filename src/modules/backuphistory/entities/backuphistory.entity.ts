import {
  Column,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Status } from 'src/common/constants/enums/statustype.enum';
import { BackUpJob } from 'src/modules/backupjob/entities/backupjob.entity';

@Entity()
export class BackUpHistory {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => BackUpJob, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'job_id' })
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

  @Column({ type: 'text', nullable: true })
  log!: string;
}
