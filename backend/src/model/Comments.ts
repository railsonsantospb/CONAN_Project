import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('comments')
export default class Comments {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  comments: string;

  @Column()
  date: string;

  @Column()
  video_id: number;

}