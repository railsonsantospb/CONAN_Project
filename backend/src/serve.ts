import express from 'express';

import path from 'path';
import 'express-async-errors';
import errorHandler from './errors/handler';
import cors from 'cors';
import dotenv from 'dotenv';


import './database/connection';
import routesTheme from './router/theme_router';
import routesUser from './router/user_router';
import routesComment from './router/comment_router';
import routesThumbnail from './router/thumbnail_router';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use(routesTheme);
app.use(routesUser);
app.use(routesComment);
app.use(routesThumbnail);
app.use(errorHandler);

app.listen(3333);
