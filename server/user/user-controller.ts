import { Request, Response, NextFunction } from 'express';
import { UserModel, User } from './user-model';
import { userRouter } from './user-router';
import cookieSession from 'cookie-session';
const argon2 = require('argon2');

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
    const userData = {
      email: req.body.email,
      password: await argon2.hash(req.body.password),
      isAdmin: false,
    };

    const user = new UserModel(userData);
    await user.save();
    res.status(200).json(user);
    console.log('user');
  } catch (err) {
    next(err);
  }
};

// login user

export const loginUser = async (req: Request<{}, {}, User>, res: Response) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email }).select('password');

  if (!user) {
    res.status(401).send('användare existerar inte');
    return;
  }
  let matchPassword = await argon2.verify(req.body.password, user.password);

  if (!req.session) {
    // dont know how to create req.session
    console.log('ingen inloggad');
  }

  if (!matchPassword) {
    console.log('fel användarnamn eller lösenord');
  }

  if (req.session) {
    req.session.user = { user: email };
    console.log(`inloggad som ${user?.email}`);
  }
};

// update user by id
export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = {
      email: req.body.email,
      password: await argon2.hash(req.body.password),
      isAdmin: false,
    };

    const { id } = req.params;

    await UserModel.findByIdAndUpdate(id, userData);

    console.log(userData);

    console.log('updateUser');

    res.status(200).json({
      new: userData,
    });
  } catch (err) {
    next(err);
  }
};

// delete user by id
export const deleteUser = async (req: Request, res: Response) => {
  const user = await UserModel.findByIdAndDelete(req.params.id);
  console.log('delete user');
  res.status(200).json(user);
};
