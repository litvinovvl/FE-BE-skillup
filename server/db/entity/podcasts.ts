import { Column, Entity } from "typeorm";

@Entity('podcasts', { schema: 'public' })
export class podcasts {

  @Column('integer', {
    nullable: false,
    primary: true,
    name: 'id'
  })
  id: number;

  @Column('character varying', {
    nullable: false,
    length: 255,
    name: 'title'
  })
  title: string;

  @Column('integer', {
    nullable: false,
    name: 'authorId'
  })
  authorId: number;

  @Column('text', {
    nullable: false,
    name: 'description'
  })
  description: string;

  @Column('integer', {
    nullable: false,
    name: 'genreId'
  })
  genreId: number;

  @Column('integer', {
    nullable: false,
    name: 'bpm'
  })
  bpm: number;

  @Column('interval', {
    nullable: false,
    name: 'duration'
  })
  duration: any;

  @Column('text', {
    nullable: false,
    name: 'thumbnail'
  })
  thumbnail: string;

  @Column('date', {
    nullable: false,
    name: 'release_date'
  })
  release_date: string;

}
