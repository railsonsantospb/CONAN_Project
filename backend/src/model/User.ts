import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export default class Product {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

}