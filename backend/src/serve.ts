import express from 'express';

import path from 'path';
import 'express-async-errors';
import errorHandler from './errors/handler';
import cors from 'cors';
import dotenv from 'dotenv';


import './database/connection';
import routesT from './router/theme_router';
import routesU from './router/user_router';
import routesC from './router/comment_router';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use(routesT);
app.use(routesU);
app.use(routesC);
app.use(errorHandler);

app.listen(3333);
