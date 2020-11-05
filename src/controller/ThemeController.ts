import { getRepository } from 'typeorm';
import Theme from '../model/Theme';
import { Request, Response } from 'express';
import themeView from '../views/themes_views';
import * as Yup from 'yup';

export default {
  async index(req: Request, res: Response) {

    const themesRepository = getRepository(Theme);

    const themes = await themesRepository.find({
      relations:['videos']
    });

    return res.json(themeView.renderMany(themes));
  },

  async show(req: Request, res: Response) {

    const { id } = req.params;

    const themesRepository = getRepository(Theme);

    const themes = await themesRepository.findOneOrFail(id, {
      relations:['videos']
    });

    return res.json(themeView.render(themes));
  },

  async create(req: Request, res: Response) {
    const {
      title,
    } = req.body;

    const themesRepository = getRepository(Theme);

    const videoRequest = req.files as Express.Multer.File[];

    const videos = videoRequest.map(video => {
      return {path: video.filename}
    });

    const data = {
      title,
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
      title, videos,
    });

    await themesRepository.save(theme);

    return res.status(201).json({theme});
  }
};