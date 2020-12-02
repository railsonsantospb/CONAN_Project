import { getRepository } from 'typeorm';
import Theme from '../model/Theme';
import { Request, Response } from 'express';
import themeView from '../views/themes_views';
import videoView from '../views/videos_views';
import * as Yup from 'yup';
import fs from 'fs';
import Videos from '../model/Videos';
import Image from '../model/Images';
import Thumbnail from '../model/Thumbnail';
import Comments from '../model/Comments';
import path from 'path';

export default {


  async index(req: Request, res: Response) {
    try {
      if (req.headers.authorization != process.env.TOKEN) {
        return res.json({ 'token': 'invalid token' });
      }
      const themesRepository = getRepository(Theme);
      const themes = await themesRepository.find({
        relations: ['videos']
      });
      return res.json(themeView.renderMany(themes));
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: 'Response Error', error });
    }
  },


  async show(req: Request, res: Response) {
    const { id } = req.params;
    try {
      if (req.headers.authorization != process.env.TOKEN) {
        return res.json({ 'token': 'invalid token' });
      }
      const themesRepository = getRepository(Theme);
      const themes = await themesRepository.findOneOrFail(id, {
        relations: ['videos']
      });
      return res.json(themeView.render(themes));
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: 'Response Error', error });
    }
  },


  async create(req: Request, res: Response) {
    try {
      const {
        title,
        about,
      } = req.body;
      if (req.headers.authorization != process.env.TOKEN) {
        return res.json({ 'token': 'invalid token' });
      }
      const themesRepository = getRepository(Theme);
      const videoRequest = req.files as Express.Multer.File[];
      const videos = videoRequest.map(video => {
        return { path: video.filename, title: title, about: about, date: Date.now() + '' }
      });
      const data = {
        title, videos
      }
      const schema = Yup.object().shape({
        title: Yup.string().required(),
        videos: Yup.array(Yup.object().shape({
          path: Yup.string().required(),
        })),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      const theme = themesRepository.create({
        title, videos
      });
      await themesRepository.save(theme);
      return res.status(201).json({ theme });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: 'Response Error', error });
    }
  },


  async updateTheme(req: Request, res: Response) {
    try {
      const {
        title,
        about,
      } = req.body;
      const { id } = req.params;
      if (req.headers.authorization != process.env.TOKEN) {
        return res.json({ 'token': 'invalid token' });
      }
      const themesRepository = getRepository(Theme);

      const videoRequest = req.files as Express.Multer.File[];
      const videos = videoRequest.map(video => {
        return { path: video.filename, title: title, about: about, date: Date.now() + '' }
      });
      const themes = await themesRepository.findOneOrFail(id, {
        relations: ['videos']
      });
      const v = themes.videos.map(video => {
        return { path: video.path, title: video.title, about: video.about, date: video.date, id: video.id }
      });
      v.push(videos[0]);
      themes.videos = v;
      await themesRepository.save(themes);
      return res.json(themeView.render(themes));
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: 'Response Error', error });
    }
  },


  async updateVideo(req: Request, res: Response) {
    try {
      const {
        title,
        about,
      } = req.body;
      const { id } = req.params;
      if (req.headers.authorization != process.env.TOKEN) {
        return res.json({ 'token': 'invalid token' });
      }
      const themesRepositoryVideo = getRepository(Videos);

      const videoRequest = req.files as Express.Multer.File[];
      const videos = videoRequest.map(video => {
        return { path: video.filename, title: title, about: about, date: Date.now() + '' }
      });
      const video = await themesRepositoryVideo.findOneOrFail(id);

      video.path = videos[0].path;
      video.title = videos[0].title;
      video.about = videos[0].about;
      video.date = videos[0].date;

      await themesRepositoryVideo.save(video);
      return res.json(videoView.render(video));
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: 'Response Error', error });
    }
  },



  async deleteTheme(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (req.headers.authorization != process.env.TOKEN) {
        return res.json({ 'token': 'invalid token' });
      }
      const themesRepositoryTheme = getRepository(Theme);
      const themesRepositoryVideo = getRepository(Videos);
      const thumbnailRepository = getRepository(Thumbnail);
      const imageRepository = getRepository(Image);

      const thumbnail = await thumbnailRepository.find({ video_id: parseInt(id), relations: ['image'] });

      const themes = await themesRepositoryTheme.findOneOrFail(id, {
        relations: ['videos'],
      });

      for (var t in thumbnail) {
        const pathImage = path.join(__dirname, '..', '..', 'uploads') + '/' + thumbnail[t].image[0].path;
        fs.unlink(pathImage, (error) => {
          if (error) {
            console.error(error);
            return res.json({ 'message': 'not delete file', file: pathImage });
          }
        });
        await imageRepository.remove(thumbnail[t].image);
      }

      for (var v in themes.videos) {
        const pathVideo = path.join(__dirname, '..', '..', 'uploads') + '/' + themes.videos[v].path;
        fs.unlink(pathVideo, (error) => {
          if (error) {
            console.error(error);
            return res.json({ 'message': 'not delete file', file: pathVideo });
          }
        });
      }

      await thumbnailRepository.remove(thumbnail);
      await themesRepositoryVideo.remove(themes.videos);
      await themesRepositoryTheme.remove(themes);


      return res.json(themeView.render(themes));
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: 'Response Error', error });
    }
  },


  async deleteVideo(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (req.headers.authorization != process.env.TOKEN) {
        return res.json({ 'token': 'invalid token' });
      }
      const themesRepositoryVideo = getRepository(Videos);
      const commentsRepository = getRepository(Comments);
      const imageRepository = getRepository(Image);
      const thumbnailRepository = getRepository(Thumbnail);
      const video = await themesRepositoryVideo.findOneOrFail(id);

      const pathVideo = path.join(__dirname, '..', '..', 'uploads') + '/' + video.path;



      await commentsRepository.delete({ video_id: parseInt(id) });

      try {
        const thumbnail = await thumbnailRepository.findOneOrFail({ video_id: parseInt(id) }, {
          relations: ['image'],
        });
        const pathImage = path.join(__dirname, '..', '..', 'uploads') + '/' + thumbnail.image[0].path;

        fs.unlink(pathImage, (error) => {
          if (error) {
            console.error(error);
            return res.json({ 'message': 'not delete file', file: pathImage });
          }
        });

        await imageRepository.remove(thumbnail.image);
        await thumbnailRepository.remove(thumbnail);

      } catch (error) {
        console.log({ message: "thumbnail not found" });
      }

      await themesRepositoryVideo.delete(id);

      fs.unlink(pathVideo, (error) => {
        if (error) {
          console.error(error);
          return res.json({ 'message': 'not delete file', file: pathVideo });
        }
      });

      return res.json({ 'message': 'successfully' });


    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: 'Response Error' });
    }
  },


};