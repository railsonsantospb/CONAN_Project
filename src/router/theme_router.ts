import ProductController from '../controller/ThemeController';
import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/theme', upload.array('videos'), ProductController.create);
routes.get('/theme', ProductController.index);
routes.get('/theme/:id', ProductController.show);

export default routes;