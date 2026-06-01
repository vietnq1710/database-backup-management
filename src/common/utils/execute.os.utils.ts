import { exec } from 'child_process';
export async function executeOS(command: string) {
  return new Promise((resolve) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error('OS EXEC ERROR:', error);
      }
      resolve({
        success: !error,
        stdout,
        stderr,
      });
    });
  });
}
