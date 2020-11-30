import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Thumbnail from './Thumbnail';

@Entity('images')
export default class Images {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  path: string;

  @ManyToOne(() => Thumbnail, thumbnail => thumbnail.image)
  @JoinColumn({ name: 'thumbnail_id' })
  thumbnail: Thumbnail;

}