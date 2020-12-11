import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUser1605177450152 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'user',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',

                },
                {
                    name: 'firstName',
                    type: 'text',
                },
                {
                    name: 'lastName',
                    type: 'text',
                },
                {
                    name: 'email',
                    type: 'text',
                },
                {
                    name: 'password',
                    type: 'text',
                },

            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user');
    }

}
