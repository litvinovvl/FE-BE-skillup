/* tslint:disable:no-shadowed-variable */
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Labels } from './labels';
import { Podcasts } from './podcasts';

@Entity('authors', { schema: 'public' })
export class Authors {

  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'id',
  })
  public id: number;

  @Column('character varying', {
    nullable: false,
    length: 255,
    name: 'name',
  })
  public name: string;

  @ManyToOne(type => Labels, labels => labels.authors, {})
  @JoinColumn({ name: 'labelId' })
  public label: Labels | null;

  @OneToMany(type => Podcasts, podcasts => podcasts.author)
  public podcasts: Podcasts[];

}
