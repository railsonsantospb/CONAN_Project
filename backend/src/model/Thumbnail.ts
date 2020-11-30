import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import Images from '../model/Images';

@Entity('thumbnail')
export default class Thumbnail {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  video_id: number;

  @OneToMany(() => Images, image => image.thumbnail, {
    cascade: ['insert', 'update', 'remove']
  })
  @JoinColumn({ name: 'thumbnail_id' })
  image: Images[];

}