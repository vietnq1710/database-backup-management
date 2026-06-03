import { Status } from '../enums/statustype.enum';

export interface ExcuteResult {
  status: Status;
  stdout: string;
  stderr: string;
  startTime: Date;
  endTime: Date;
}
