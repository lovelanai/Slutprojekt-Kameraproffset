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
  .get('/user/:id', getUser)
  .get('/user/login', loginUser)
  .post('/user', addUser)
  .put('/user/:id', updateUser)
  .delete('/user/:id', deleteUser);
