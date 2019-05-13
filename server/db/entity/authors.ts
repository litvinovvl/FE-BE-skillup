import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { labels } from "./labels";
import { podcasts } from "./podcasts";

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
  @JoinColumn({ name: 'labelId' })
  label: labels | null;

  @OneToMany(type => podcasts, podcasts => podcasts.author)
  podcasts: podcasts[];

}
