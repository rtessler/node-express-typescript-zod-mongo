import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import todos from './todos/todos.routes'

const router = express.Router();

// api/v1/ home route

// MessageResponse defined the shape of the response
// must return an object with a message field
// any other field causes an error
// first arg to get is the get options eg params

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

/*
can also do it like this
import { Request, Response, NextFunction } from 'express'
router.get('/', (req: Request, res: Response<MessageResponse>) => {
*/

// app.use or router.use seems to do the same

router.use('/todos', todos)

export default router;
