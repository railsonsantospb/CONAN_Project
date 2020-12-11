import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import userView from '../views/user_views';
import User from '../model/User';
import * as Yup from 'yup';


export default {


  // return all view users
  async show(req: Request, res: Response) {

    try {

      const usersRepository = getRepository(User);


      if (req.headers.authorization != process.env.TOKEN) {
        return res.json({ 'token': 'invalid token' });
      }

      const users = await usersRepository.find();

      return res.json(userView.renderMany(users));
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: 'Response Error', error });
    }
  },

  // return acess exist login database
  async indexAcess(req: Request, res: Response) {

    try {
      const {
        email,
        password,
      } = req.body;

      const usersRepository = getRepository(User);


      if (req.headers.authorization != process.env.TOKEN) {
        return res.json({ 'token': 'invalid token' });
      }
      const users = await usersRepository.find({email: email, password: password});
      if (users.length > 0) {
        return res.json({ message: true });
        console.log(userView.renderMany(users));
      } else {
        return res.json({ message: false });
      }
      
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: 'Response Error', error });
    }
  },


  // return one view user
  async index(req: Request, res: Response) {

    try {

      const { id } = req.params;

      if (req.headers.authorization != process.env.TOKEN) {
        return res.json({ 'token': 'invalid token' });
      }

      const usersRepository = getRepository(User);

      const users = await usersRepository.findOneOrFail(id);

      return res.json(userView.render(users));
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: 'Response Error', error });
    }
  },


  // add new user
  async create(req: Request, res: Response) {

    try {
      const {
        firstName,
        lastName,
        email,
        password,
      } = req.body;

      if (req.headers.authorization != process.env.TOKEN) {
        return res.json({ 'token': 'invalid token' });
      }

      const usersRepository = getRepository(User);


      const data = {
        firstName, lastName, email, password
      }

      const schema = Yup.object().shape({
        email: Yup.string().required(),
        password: Yup.string().required(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const user = usersRepository.create({
        firstName, lastName, email, password
      });

      await usersRepository.save(user);

      return res.status(201).json({ user });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: 'Response Error', error });
    }
  },


  // update password user
  async updateUser(req: Request, res: Response) {
    try {
      const {
        password,
        email,
      } = req.body;
      
      if (req.headers.authorization != process.env.TOKEN) {
        return res.json({ 'token': 'invalid token' });
      }
      const usersRepository = getRepository(User);

      const user = await usersRepository.findOneOrFail({email: email});

      user.password = password;

      await usersRepository.save(user);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: 'Response Error', error });
    }
  },


  // delete one user
  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      if (req.headers.authorization != process.env.TOKEN) {
        return res.json({ 'token': 'invalid token' });
      }
      const usersRepository = getRepository(User);
      await usersRepository.delete(id);
      return res.json({ 'message': 'successfully' });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: 'Response Error', error });
    }
  },
}

