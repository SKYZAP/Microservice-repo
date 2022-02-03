import {MigrationInterface, QueryRunner} from "typeorm";

export class initPayment1643861536872 implements MigrationInterface {
    name = 'initPayment1643861536872'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."payment_entity_status_enum" AS ENUM('SUCCESS', 'FAILED')`);
        await queryRunner.query(`CREATE TABLE "payment_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "orderId" character varying NOT NULL, "vendor" character varying NOT NULL, "status" "public"."payment_entity_status_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6c397c81035bd5b42d16ef3bc70" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "payment_entity"`);
        await queryRunner.query(`DROP TYPE "public"."payment_entity_status_enum"`);
    }

}
