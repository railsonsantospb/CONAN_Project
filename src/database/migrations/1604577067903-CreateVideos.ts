import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateVideos1604577067903 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'videos',
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
                    name: 'title',
                    type: 'string',
                },
                {
                    name: 'about',
                    type: 'string',
                },
                {
                    name: 'themes_id',
                    type: 'integer',
                },
                {
                    name: 'path',
                    type: 'string',
                },
                {
                    name: 'date',
                    type: 'text',
                },
            ],
            foreignKeys: [
                {
                    name: 'ThemeVideos',
                    columnNames: ['themes_id'],
                    referencedTableName: 'theme',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('videos');
    }

}
