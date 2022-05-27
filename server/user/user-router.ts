import express from 'express';
import {
  getUser,
  addUser,
  deleteUser,
  updateUser,
  getAllUsers,
  isUserLoggedIn,
  logoutUser,
  loginUser,
} from './user-controller';

export const userRouter = express
  .Router()
  .get('/user', getAllUsers)
  .post('/user/login', loginUser)
  .get('/user/logout', logoutUser)
  .get('/user/isloggedin', isUserLoggedIn)
  .get('/user/:id', getUser)
  .post('/user/signup', addUser)
  .put('/user/:id', updateUser)
  .delete('/user/:id', deleteUser);
