import express from 'express';
import { getUser, addUser } from './user-controller';

export const userRouter = express
  .Router()
  .get('/user', getUser)
  .post('/user', addUser);

// userRouter.get('/user', getUser);
// userRouter.post('/user', addUser);

// export default userRouter;
