import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSchema1781862879029 implements MigrationInterface {
  name = 'InitialSchema1781862879029';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "back_up_job" ADD "description" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "back_up_job" DROP COLUMN "description"`,
    );
  }
}
