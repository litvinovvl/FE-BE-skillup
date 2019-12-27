import { Column, Entity, OneToMany } from 'typeorm';
import { Authors } from './authors';

@Entity('labels', { schema:'public' })
export class Labels {

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

  @OneToMany(type => Authors, authors => authors.label)
  public authors: Authors[];

}
