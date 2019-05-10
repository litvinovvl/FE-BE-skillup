import { Column, Entity } from "typeorm";

@Entity('genres', { schema: 'public'} )
export class genres {

  @Column('integer', {
    nullable: false,
    primary: true,
    name: 'id'
  })
  id:number;


  @Column('character varying', {
    nullable: false,
    length: 255,
    name: 'name'
  })
  name: string;

}
