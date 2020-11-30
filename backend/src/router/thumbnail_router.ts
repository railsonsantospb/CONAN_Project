import ThumbnailController from '../controller/ThumbnailController';
import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';


const routes = Router();

const upload = multer(uploadConfig);

routes.post('/thumbnail/:id', upload.array('image'), ThumbnailController.create);
routes.get('/thumbnail', ThumbnailController.show);
routes.get('/thumbnail/:id', ThumbnailController.indexThumbnail);
routes.put('/thumbnail/:id', upload.array('image'), ThumbnailController.updateImage);
routes.delete('/thumbnail/:id', ThumbnailController.deleteImage);


export default routes;