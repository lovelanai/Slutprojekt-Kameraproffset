import { Request, Response, NextFunction } from 'express';
import { UserModel, User } from './user-model';

// get all users
export const getAllUsers = async (req: Request, res: Response) => {
  const users = await UserModel.find({});
  console.log('getusers');
  res.status(200).json(users);
  res.send();
};

// get user by id
export const getUser = async (req: Request, res: Response) => {
  console.log('get user by id');
  const user = await UserModel.findById(req.params.id);
  res.status(200).json(user);
};

// create a new user
export const addUser = async (
  req: Request<{}, {}, User>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = new UserModel(req.body);
    await user.save();
    res.status(200).json(user);
    console.log('user');
  } catch (err) {
    next(err);
  }
};

// update user by id
export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  // const updatedEmail = await UserModel.findOneAndUpdate(req.body.email);
  // const updatedPassword = await UserModel.findOneAndUpdate(req.body.password);
  const { id } = req.params;

  await UserModel.findByIdAndUpdate(id, req.body);

  console.log(req.body);

  console.log('updateUser');

  res.status(200).json({
    new: req.body,
  });
};

// delete user by id
export const deleteUser = async (req: Request, res: Response) => {
  const user = await UserModel.findByIdAndDelete(req.params.id);
  console.log('delete user');
  res.status(200).json(user);
};
