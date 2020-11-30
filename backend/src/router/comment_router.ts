import CommentController from '../controller/CommentController';
import { Router } from 'express';


const routes = Router();

routes.post('/comment/:id', CommentController.create);
routes.get('/comment', CommentController.show);
routes.get('/comment/:id', CommentController.index);
routes.get('/commentC/:id', CommentController.indexComment);
routes.delete('/comment/:id', CommentController.deleteComment);

export default routes;