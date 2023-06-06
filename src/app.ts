import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import * as middlewares from './middlewares';
import api from './api';
import MessageResponse from './interfaces/MessageResponse';

require('dotenv').config();

//console.log('process.env.MONGO_URI =', process.env.MONGO_URI)

const app = express();

// middle wares

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

// handle '/' route, 
// get takes in some options and returns an object that implements MessageResponse which is a string
// this endpoint does not handle any parameters

app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

// handle app/v1 routes, load the api router

app.use('/api/v1', api);

// more middleware

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
