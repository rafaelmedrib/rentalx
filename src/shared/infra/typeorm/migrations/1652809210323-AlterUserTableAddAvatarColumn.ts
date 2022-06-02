import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm";

export class AlterUserTableAddAvatarColumn1652809210323
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      new Table({
        name: "users",
      }),
      new TableColumn({
        name: "avatar",
        type: "varchar",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("users", "avatar");
  }
}
