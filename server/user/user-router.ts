import express from 'express';
import {
  getUser,
  addUser,
  deleteUser,
  updateUser,
  getAllUsers,
  loginUser,
} from './user-controller';

export const userRouter = express
  .Router()
  .get('/user', getAllUsers)
  .post('/user/login', loginUser)
  .get('/user/:id', getUser)
  .post('/user', addUser)
  .put('/user/:id', updateUser)
  .delete('/user/:id', deleteUser);
