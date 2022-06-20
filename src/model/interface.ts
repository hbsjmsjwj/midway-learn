import { EntityModel } from '@midwayjs/orm';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@EntityModel()
export class Interface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  path: string;

  @Column()
  method: String;

  @Column()
  title: String;
  
  @Column()
  project_id: String;

  @Column('text')
  description: String;

  @Column()
  res_body: String;
}
