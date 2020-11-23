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
                    name: 'path',
                    type: 'string',
                },
                {
                    name: 'date',
                    type: 'text',
                },
                {
                    name: 'theme_id',
                    type: 'integer',
                },
                {
                    name: 'thumbnail',
                    type: 'text',
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('videos');
    }

}
