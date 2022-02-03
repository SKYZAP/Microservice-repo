import { MigrationInterface, QueryRunner } from 'typeorm';

export class initOrder1643731495590 implements MigrationInterface {
  name = 'initOrder1643731495590';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."order_entity_orderstate_enum" AS ENUM('CREATED', 'CONFIRMED', 'DELIVERED', 'CANCELLED')`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" character varying NOT NULL, "productName" character varying NOT NULL, "productPrice" integer NOT NULL, "productQuantity" integer NOT NULL, "totalCost" numeric NOT NULL, "orderState" "public"."order_entity_orderstate_enum" NOT NULL DEFAULT 'CREATED', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_428b558237e70f2cd8462e1bea1" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "order_entity"`);
    await queryRunner.query(
      `DROP TYPE "public"."order_entity_orderstate_enum"`,
    );
  }
}
