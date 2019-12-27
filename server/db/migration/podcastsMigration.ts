import { MigrationInterface, QueryRunner } from 'typeorm';

export class PodcastsMigration implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query("CREATE TABLE 'public'.'labels' ('id' integer NOT NULL, 'name' character varying(255) NOT NULL, CONSTRAINT 'PK_2cf0ac926eba464b763f33bb446' PRIMARY KEY ('id'))");
    await queryRunner.query("CREATE TABLE 'public'.'genres' ('id' integer NOT NULL, 'name' character varying(255) NOT NULL, CONSTRAINT 'PK_c96fb39407168178a9aab9f5d76' PRIMARY KEY ('id'))");
    await queryRunner.query("CREATE TABLE 'public'.'podcasts' ('id' SERIAL NOT NULL, 'title' character varying(255) NOT NULL, 'description' text NOT NULL, 'bpm' integer NOT NULL, 'duration' interval NOT NULL, 'thumbnail' text, 'release_date' date NOT NULL, 'authorId' integer NOT NULL, 'genreId' integer NOT NULL, CONSTRAINT 'PK_3840de5d1069e33c70084262415' PRIMARY KEY ('id'))");
    await queryRunner.query("CREATE TABLE 'public'.'authors' ('id' SERIAL NOT NULL, 'name' character varying(255) NOT NULL, 'labelId' integer, CONSTRAINT 'PK_d40c793159ff60993c821631ec9' PRIMARY KEY ('id'))");
    await queryRunner.query("ALTER TABLE 'public'.'podcasts' ADD CONSTRAINT 'FK_164bcc082d38b28a86d7cb77bd2' FOREIGN KEY ('authorId') REFERENCES 'public'.'authors'('id') ON DELETE NO ACTION ON UPDATE NO ACTION");
    await queryRunner.query("ALTER TABLE 'public'.'podcasts' ADD CONSTRAINT 'FK_e76bd14bbbfe0741f608ca2a0f8' FOREIGN KEY ('genreId') REFERENCES 'public'.'genres'('id') ON DELETE NO ACTION ON UPDATE NO ACTION");
    await queryRunner.query("ALTER TABLE 'public'.'authors' ADD CONSTRAINT 'FK_c1abc0938534e7843ebaa97a826' FOREIGN KEY ('labelId') REFERENCES 'public'.'labels'('id') ON DELETE NO ACTION ON UPDATE NO ACTION");
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query("ALTER TABLE 'public'.'authors' DROP CONSTRAINT 'FK_c1abc0938534e7843ebaa97a826'");
    await queryRunner.query("ALTER TABLE 'public'.'podcasts' DROP CONSTRAINT 'FK_e76bd14bbbfe0741f608ca2a0f8'");
    await queryRunner.query("ALTER TABLE 'public'.'podcasts' DROP CONSTRAINT 'FK_164bcc082d38b28a86d7cb77bd2'");
    await queryRunner.query("DROP TABLE 'public'.'authors'");
    await queryRunner.query("DROP TABLE 'public'.'podcasts'");
    await queryRunner.query("DROP TABLE 'public'.'genres'");
    await queryRunner.query("DROP TABLE 'public'.'labels'");
  }

}
