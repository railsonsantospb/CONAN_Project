import { getRepository } from 'typeorm';
import Thumbnail from '../model/Thumbnail';
import Image from '../model/Images';
import { Request, Response } from 'express';
import thumbnailView from '../views/thumbnail_views';
import * as Yup from 'yup';
import fs from 'fs';
import Videos from '../model/Videos';

export default {


  // async index(req: Request, res: Response) {
  //   const { id } = req.params;
  //   if (req.headers.authorization != process.env.TOKEN) {
  //     return res.json({ 'token': 'invalid token' });
  //   }
  //   const thumbnailRepository = getRepository(Thumbnail);

  //   const thumbnail = await thumbnailRepository.findOneOrFail(id, {
  //     relations:['image']
  //   });


  //   return res.json(thumbnailView.render(thumbnail));
  // },

  async indexThumbnail(req: Request, res: Response) {
    const { id } = req.params;
    if (req.headers.authorization != process.env.TOKEN) {
      return res.json({ 'token': 'invalid token' });
    }
    try {
      const thumbnailRepository = getRepository(Thumbnail);

      const thumbnail = await thumbnailRepository.findOneOrFail({ video_id: parseInt(id) }, {
        relations: ['image']
      });

      console.log(thumbnail);
      return res.json(thumbnailView.render(thumbnail));
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: 'Response Error', error });
    }
  },


  async show(req: Request, res: Response) {

    if (req.headers.authorization != process.env.TOKEN) {
      return res.json({ 'token': 'invalid token' });
    }

    try {

      const thumbnailRepository = getRepository(Thumbnail);

      const thumbnail = await thumbnailRepository.find({
        relations: ['image']
      });

      return res.json(thumbnailView.renderMany(thumbnail));
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: 'Response Error', error });
    }
  },


  async create(req: Request, res: Response) {

    const { id } = req.params;
    const video_id = parseInt(id);

    if (req.headers.authorization != process.env.TOKEN) {
      return res.json({ 'token': 'invalid token' });
    }
    try {
      const thumbnailRepository = getRepository(Thumbnail);

      const imageRequest = req.files as Express.Multer.File[];
      const image = imageRequest.map(image => {
        return { path: image.filename }
      });

      const data = {
        video_id, image
      }

      const schema = Yup.object().shape({
        video_id: Yup.string().required(),
        image: Yup.array(Yup.object().shape({
          path: Yup.string().required(),
        })),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const thumbnail = thumbnailRepository.create({
        video_id, image,
      });
      await thumbnailRepository.save(thumbnail);

      return res.status(201).json({ thumbnail });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: 'Response Error', error });
    }
  },


  async updateThumbnail(req: Request, res: Response) {

    const { video_id } = req.params;
    if (req.headers.authorization != process.env.TOKEN) {
      return res.json({ 'token': 'invalid token' });
    }
    try {
      const thumbnailRepository = getRepository(Thumbnail);
      const imageRequest = req.files as Express.Multer.File[];

      const image = imageRequest.map(image => {
        return { path: image.filename }
      });

      const data = {
        video_id, image
      }
      const thumbnail = await thumbnailRepository.find({ video_id: parseInt(video_id), relations: ['image'] });

      thumbnail[0].image[0].path = image[0].path;
      await thumbnailRepository.save(thumbnail);
      return res.json((thumbnailView.renderMany(thumbnail)));
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: 'Response Error', error });
    }
  },


  async deleteThumbnail(req: Request, res: Response) {
    const { video_id } = req.params;
    if (req.headers.authorization != process.env.TOKEN) {
      return res.json({ 'token': 'invalid token' });
    }
    try {
      const thumbnailRepository = getRepository(Thumbnail);
      const imageRepository = getRepository(Image);

      const thumbnail = await thumbnailRepository.findOneOrFail(video_id, {
        relations: ['image'],
      });
      await imageRepository.remove(thumbnail.image);
      await thumbnailRepository.remove(thumbnail);
      return res.json(thumbnailView.render(thumbnail));
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: 'Response Error', error });
    }
  },


}