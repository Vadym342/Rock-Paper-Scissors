import { QueryRunner } from 'typeorm';

import { BaseMigration } from '@src/database/base-migrations';

export class CreateTableGuest17094883365932 extends BaseMigration {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await this.applySchema(queryRunner);
    await queryRunner.query(`
      CREATE TABLE guests (
        id               UUID DEFAULT uuid_generate_v4()       NOT NULL,
        first_name       VARCHAR(100)                          NOT NULL,
        status           INT                                   NOT NULL,
        created_date     TIMESTAMP   DEFAULT current_timestamp NOT NULL,
        updated_date     TIMESTAMP   DEFAULT current_timestamp NOT NULL,
        deleted_date     TIMESTAMP,
        CONSTRAINT pk_guests PRIMARY KEY (id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await this.applySchema(queryRunner);
    await queryRunner.query(`DROP TABLE guests;`);
  }
}
