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
                    name: 'video_id',
                    type: 'integer',
                },
                {
                    name: 'date',
                    type: 'text',
                },
            ],
            foreignKeys: [
                {
                    name: 'VideoComments',
                    columnNames: ['video_id'],
                    referencedTableName: 'videos',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('comments');
    }

}
