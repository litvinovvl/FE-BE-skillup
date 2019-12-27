import { Column, Entity, OneToMany } from 'typeorm';
import { Podcasts } from './podcasts';

@Entity('genres', { schema: 'public' })
export class Genres {

  @Column('integer', {
    nullable: false,
    primary: true,
    name: 'id',
  })
  public id: number;

  @Column('character varying', {
    nullable: false,
    length: 255,
    name: 'name',
  })
  public name: string;

  @OneToMany(type => Podcasts, podcasts => podcasts.genre)
  public podcasts: Podcasts[];

}
