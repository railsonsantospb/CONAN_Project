import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import userView from '../views/user_views';
import User from '../model/User';
import * as Yup from 'yup';



export default {
    async index(req: Request, res: Response) {
     

      const usersRepository = getRepository(User);
  
      const users = await usersRepository.find();
  
      return res.json(userView.renderMany(users));
    },

    async show(req: Request, res: Response) {

      const { id } = req.params;

      
  
      const usersRepository = getRepository(User);
  
      const users = await usersRepository.findOneOrFail(id);
  
      return res.json(userView.render(users));
    },

    async create(req: Request, res: Response) {
    

        const {
          email,
          password,
        } = req.body;
        
        console.log(req.body);

        const usersRepository = getRepository(User);

    
        const data = {
          email, password
        }
    
        const schema = Yup.object().shape({
          email: Yup.string().required(),
          password: Yup.string().required(),
        });
    
        await schema.validate(data, {
          abortEarly: false,
        });
    
        const user = usersRepository.create({
          email, password
        });
    
        await usersRepository.save(user);
    
        return res.status(201).json({user});
      },
}

