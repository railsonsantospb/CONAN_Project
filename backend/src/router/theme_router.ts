import ThemeController from '../controller/ThemeController';
import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/theme', upload.array('videos'), ThemeController.create);
routes.get('/theme', ThemeController.index);
routes.get('/theme/:id', ThemeController.show);
routes.put('/theme/:id', upload.array('videos'), ThemeController.update);

export default routes;