import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateComments1605885417837 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'comments',
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
                    name: 'comments',
                    type: 'string',
                },
                {
                    name: 'date',
                    type: 'text',
                },
                {
                    name: 'video_id',
                    type: 'integer',
                }
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('comments');
    }

}
