import UserController from '../controller/UserController';
import { Router } from 'express';


const routes = Router();

routes.post('/user', UserController.create);
routes.get('/user', UserController.index);
routes.get('/user_login', UserController.indexAcess);
routes.get('/user/:id', UserController.show);

export default routes;