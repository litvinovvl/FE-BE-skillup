import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { authors } from "./authors";
import { genres } from "./genres";

@Entity('podcasts', { schema:'public'} )
export class podcasts {

  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'id'
  })
  id: number;

  @Column('character varying', {
    nullable: false,
    length: 255,
    name: 'title'
  })
  title: string;

  @ManyToOne(type => authors, authors => authors.podcasts, { nullable: false })
  @JoinColumn({ name: 'authorId' })
  author: authors | null;

  @Column('text', {
    nullable: false,
    name: 'description'
  })
  description: string;

  @ManyToOne(type => genres, genres => genres.podcasts, { nullable: false })
  @JoinColumn({ name:'genreId' })
  genre: genres | null;

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
    nullable: true,
    name: 'thumbnail'
  })
  thumbnail: string | null;

  @Column('date', {
    nullable: false,
    name: 'release_date'
  })
  release_date: string;

}
