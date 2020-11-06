import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Theme from './Theme';

@Entity('videos')
export default class Videos {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column()
  about: string;

  @Column()
  path: string;

  @Column()
  date: string;

  @ManyToOne(() => Theme, theme => theme.videos)
  @JoinColumn({ name: 'videos_id' })
  theme: Theme;

}