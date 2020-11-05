import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('theme')
export default class Product {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

}