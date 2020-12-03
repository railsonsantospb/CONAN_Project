import ThemeController from '../controller/ThemeController';
import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/theme', upload.array('videos'), ThemeController.create);

routes.get('/theme', ThemeController.show);
routes.get('/theme/:id', ThemeController.index);

routes.put('/theme/:id', upload.array('videos'), ThemeController.updateTheme);
routes.put('/theme_video/:id', upload.array('videos'), ThemeController.updateVideo);

routes.delete('/themeT/:id', ThemeController.deleteTheme);
routes.delete('/themeV/:id', ThemeController.deleteVideo);

export default routes;