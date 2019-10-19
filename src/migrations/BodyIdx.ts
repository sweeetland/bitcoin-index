import { MigrationInterface, QueryRunner } from 'typeorm'
import { BLOCKHEIGHT_INDEX } from '../config/env'

export class BodyIdx1571507106138 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE INDEX "body_idx" ON op_return USING hash (body) WHERE "blockheight" > ${BLOCKHEIGHT_INDEX}`
    )
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP INDEX "body_idx"`)
  }
}
