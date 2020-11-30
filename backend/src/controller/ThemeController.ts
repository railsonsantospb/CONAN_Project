import { getRepository } from 'typeorm';
import Theme from '../model/Theme';
import { Request, Response } from 'express';
import themeView from '../views/themes_views';
import * as Yup from 'yup';
import fs from 'fs';
import Videos from '../model/Videos';
import Comments from '../model/Comments';

export default {


  async index(req: Request, res: Response) {
    if (req.headers.authorization != process.env.TOKEN) {
      return res.json({ 'token': 'invalid token' });
    }
    const themesRepository = getRepository(Theme);
    const themes = await themesRepository.find({
      relations: ['videos']
    });
    return res.json(themeView.renderMany(themes));
  },


  async show(req: Request, res: Response) {
    const { id } = req.params;
    if (req.headers.authorization != process.env.TOKEN) {
      return res.json({ 'token': 'invalid token' });
    }
    const themesRepository = getRepository(Theme);
    const themes = await themesRepository.findOneOrFail(id, {
      relations: ['videos']
    });
    return res.json(themeView.render(themes));
  },


  async create(req: Request, res: Response) {
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
  },


  async update(req: Request, res: Response) {
    const {
      title,
      about,
    } = req.body;
    const { id } = req.params;
    if (req.headers.authorization != process.env.TOKEN) {
      return res.json({ 'token': 'invalid token' });
    }
    const themesRepository = getRepository(Theme);
    const themesRepositoryVideo = getRepository(Videos);
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
  },


  async deleteTheme(req: Request, res: Response) {
    const { id } = req.params;
    if (req.headers.authorization != process.env.TOKEN) {
      return res.json({ 'token': 'invalid token' });
    }
    const themesRepositoryTheme = getRepository(Theme);
    const themesRepositoryVideo = getRepository(Videos);
    const themes = await themesRepositoryTheme.findOneOrFail(id, {
      relations: ['videos'],
    });
    await themesRepositoryVideo.remove(themes.videos);
    await themesRepositoryTheme.remove(themes);
    return res.json(themeView.render(themes));
  },


  async deleteVideo(req: Request, res: Response) {
    const { id } = req.params;
    if (req.headers.authorization != process.env.TOKEN) {
      return res.json({ 'token': 'invalid token' });
    }
    const themesRepositoryVideo = getRepository(Videos);
    await themesRepositoryVideo.delete(id);

    const commentsRepository = getRepository(Comments);
    await commentsRepository.delete({ video_id: id });
    return res.json({ 'message': 'successfully' });
  },


};