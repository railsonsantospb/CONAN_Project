import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import Videos from './Videos';

@Entity('theme')
export default class Theme {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

}