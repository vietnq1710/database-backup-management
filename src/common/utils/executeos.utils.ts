import { exec } from 'child_process';
import { ExcuteResult } from '../interfaces/excuteos.interface';
import { Status } from '../constants/enums/statustype.enum';

export async function executeOS(
  command: string,
  env?: NodeJS.ProcessEnv,
): Promise<ExcuteResult> {
  const startTime = new Date();
  return new Promise((resolve) => {
    exec(
      command,
      {
        env: {
          ...process.env,
          ...env,
        },
      },
      (error, stdout, stderr) => {
        const endTime = new Date();
        if (error) {
          console.error('OS EXEC ERROR:', {
            message: error.message,
            stack: error.stack,
          });
        }

        resolve({
          command,
          status: error != null ? Status.FAILED : Status.SUCCESS,
          stdout,
          stderr,
          startTime,
          endTime,
        });
      },
    );
  });
}
