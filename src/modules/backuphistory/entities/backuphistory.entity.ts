import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from 'src/common/enums/statustype.enum';

@Entity()
export class BackUpHistory {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  jobId!: number;

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
