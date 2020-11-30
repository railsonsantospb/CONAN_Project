import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateThumbnail1606322510022 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'thumbnail',
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
                    name: 'video_id',
                    type: 'integer',
                }

            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('thumbnail');
    }

}
