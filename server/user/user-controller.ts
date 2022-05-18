import { Request, Response, NextFunction } from 'express';
import { UserModel, User } from './user-model';

export const getUser = async (req: Request, res: Response) => {
  const users = await UserModel.find({});
  res.status(200).json(users);
  //   res.send('test');
  //   console.log('getuser');
};

export const addUser = async (
  req: Request<{}, {}, User>,
  res: Response,
  next: NextFunction
) => {
  console.log('adduser');

  try {
    const user = new UserModel(req.body);
    await user.save();
    res.status(200).json(user);
    console.log('user');
  } catch (err) {
    next(err);
  }
};
