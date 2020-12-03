import { getRepository } from 'typeorm';
import Comments from '../model/Comments';
import { Request, Response } from 'express';
import commentView from '../views/comments_views';
import * as Yup from 'yup';
import Videos from '../model/Videos';


export default {

  // add new comments
  async create(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const {
        comments,
      } = req.body;
      const video_id = id;
      if (req.headers.authorization != process.env.TOKEN) {
        return res.json({ 'token': 'invalid token' });
      }
      const commentsRepository = getRepository(Comments);
      const date = Date.now();
      const data = {
        comments,
        date,
        video_id
      }

      const schema = Yup.object().shape({
        comments: Yup.string().required(),
        date: Yup.number().required(),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      const themesRepositoryVideo = getRepository(Videos);

      const v = await themesRepositoryVideo.findOneOrFail(video_id);
      const comm = commentsRepository.create({
        comments, date, video_id
      });

      await commentsRepository.save(comm);
      return res.status(201).json({ comm });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: 'Response Error', error });
    }

  },

  // return view all comments
  async show(req: Request, res: Response) {
    if (req.headers.authorization != process.env.TOKEN) {
      return res.json({ 'token': 'invalid token' });
    }
    try {
      const commentsRepository = getRepository(Comments);
      const comment = await commentsRepository.find();
      return res.json(commentView.renderMany(comment));
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: 'Response Error', error });
    }
  },

  // return view one comment
  async index(req: Request, res: Response) {
    const { id } = req.params;
    try {
      if (req.headers.authorization != process.env.TOKEN) {
        return res.json({ 'token': 'invalid token' });
      }
      const commentsRepository = getRepository(Comments);
      const comment = await commentsRepository.findOneOrFail(id);
      return res.json(comment);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: 'Response Error', error });
    }

  },

  // return view one comment for video_id
  async indexComment(req: Request, res: Response) {
    const { id } = req.params;
    try {
      if (req.headers.authorization != process.env.TOKEN) {
        return res.json({ 'token': 'invalid token' });
      }
      const commentsRepository = getRepository(Comments);
      const comment = await commentsRepository.find({ video_id: id });
      return res.json(comment);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: 'Response Error', error });
    }
  },

  // delete one comment
  async deleteComment(req: Request, res: Response) {
    const { id } = req.params;
    try {
      if (req.headers.authorization != process.env.TOKEN) {
        return res.json({ 'token': 'invalid token' });
      }
      const commentsRepository = getRepository(Comments);
      await commentsRepository.delete(id);
      return res.json({ 'message': 'successfully' });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: 'Response Error', error });
    }
  },


}