import { getRepository } from 'typeorm';
import Theme from '../model/Theme';
import { Request, Response } from 'express';
import themeView from '../views/themes_views';
import * as Yup from 'yup';
import fs from 'fs';
import Videos from '../model/Videos';


export default {
  async index(req: Request, res: Response) {

    if(req.headers.authorization != process.env.TOKEN){
      return res.json({'token': 'invalid token'});
    }

    const themesRepository = getRepository(Theme);

    const themes = await themesRepository.find({
      relations: ['videos']
    });


    return res.json(themeView.renderMany(themes));
  },

  async show(req: Request, res: Response) {

    const { id } = req.params;

    if(req.headers.authorization != process.env.TOKEN){
      return res.json({'token': 'invalid token'});
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
    } = req.body;

    if(req.headers.authorization != process.env.TOKEN){
      return res.json({'token': 'invalid token'});
    }

    const themesRepository = getRepository(Theme);

    const data = {
      title
    }

    const schema = Yup.object().shape({
      title: Yup.string().required(),
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const theme = themesRepository.create({
      title
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

    if(req.headers.authorization != process.env.TOKEN){
      return res.json({'token': 'invalid token'});
    }


    const themesRepository = getRepository(Theme);

    const videoRequest = req.files as Express.Multer.File[];


    const videos = videoRequest.map(video => {
      return { path: video.filename, title: title, about: about, date: Date.now() + '' }
    });


    const themes = await themesRepository.findOneOrFail(id, {
      relations: ['videos']
    });
    
    console.log(videos);

    await themesRepository.save(themes);

    return res.json(themeView.render(themes));
  },

  async deleteTheme(req: Request, res: Response) {

    const { id } = req.params;

    if(req.headers.authorization != process.env.TOKEN){
      return res.json({'token': 'invalid token'});
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

    if(req.headers.authorization != process.env.TOKEN){
      return res.json({'token': 'invalid token'});
    }

    const themesRepositoryVideo = getRepository(Videos);


    await themesRepositoryVideo.delete(id);

    return res.json({ 'message': 'successfully' });
  },
};