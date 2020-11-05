import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import Videos from './Videos';

@Entity('theme')
export default class Product {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @OneToMany(() => Videos, video => video.theme, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'videos_id' })
  videos: Videos[];

}