import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { labels } from "./labels";

@Entity('authors', { schema: 'public' })
export class authors {

  @PrimaryGeneratedColumn({
    type: 'integer',
    name: 'id'
  })
  id: number;

  @Column('character varying', { 
    nullable: false,
    length: 255,
    name: 'name'
  })
  name: string;

  @ManyToOne(type => labels, labels => labels.authors, {})
  @JoinColumn({ name: 'labelId'})
  label: labels | null;

}
