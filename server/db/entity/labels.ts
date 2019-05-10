import { Column, Entity, OneToMany } from "typeorm";
import { authors } from "./authors";

@Entity('labels', { schema:'public' })
export class labels {

  @Column('integer', {
    nullable: false,
    primary: true,
    name: 'id'
  })
  id: number;

  @Column('character varying', {
    nullable: false,
    length: 255,
    name: 'name'
  })
  name: string;

  @OneToMany(type => authors, authors => authors.label)
  authors: authors[];

}
