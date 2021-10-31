import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsersRoles1635700739487 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users_roles",
                columns: [
                    { name: "role_id", type: "uuid" },
                    { name: "user_id", type:"uuid" },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        columnNames: ["role_id"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "roles",
                        name: "fk_roles_user",
                        onDelete:"RESTRICT",
                        onUpdate:"CASCADE"
                    },
                    {
                        columnNames: ["user_id"],
                        referencedColumnNames: ["id"],
                        referencedTableName: "users",
                        name: "fk_users_roles",
                        onDelete:"RESTRICT",
                        onUpdate:"CASCADE"
                    }
                ]
            })

        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users_roles');
    }

}
