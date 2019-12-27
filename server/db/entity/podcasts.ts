import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Authors } from './authors';
import { Genres } from './genres';

@Entity('podcasts', { schema:'public' })
export class Podcasts {

  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'id',
  })
  public id: number;

  @Column('character varying', {
    nullable: false,
    length: 255,
    name: 'title',
  })
  public title: string;

  @ManyToOne(type => Authors, authors => authors.podcasts, { nullable: false })
  @JoinColumn({ name: 'authorId' })
  public author: Authors | null;

  @Column('text', {
    nullable: false,
    name: 'description',
  })
  public description: string;

  @ManyToOne(type => Genres, genres => genres.podcasts, { nullable: false })
  @JoinColumn({ name:'genreId' })
  public genre: Genres | null;

  @Column('integer', {
    nullable: false,
    name: 'bpm',
  })
  public bpm: number;

  @Column('interval', {
    nullable: false,
    name: 'duration',
  })
  public duration: {
    hours: number,
    minutes: number,
    seconds: number,
  } | number;

  @Column('text', {
    nullable: true,
    name: 'thumbnail',
  })
  public thumbnail: string | null;

  @Column('date', {
    nullable: false,
    name: 'release_date',
  })
  public release_date: string;

}
