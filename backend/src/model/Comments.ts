import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Videos from './Videos';

@Entity('comments')
export default class Comments {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  comments: string;

  @Column()
  date: string;

  @ManyToOne(() => Videos, video => video.comments)
  @JoinColumn({ name: 'comments_id' })
  videos: Videos;

}