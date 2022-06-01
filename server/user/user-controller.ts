import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { UserModel } from './user-model';
import 'cookie-session';
import { assertIsAdmin } from '../errorFunctions';
const argon2 = require('argon2');

// get all users
export const getAllUsers = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    assertIsAdmin(
      req,
      res,
      'Du kan inte hämta alla användare utan att vara inloggad som admin'
    );

    const users = await UserModel.find({});
    console.log('getusers');
    res.status(200).json(users);
    res.send();
  }
);

// get user by id
export const getUser = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    assertIsAdmin(
      req,
      res,
      'Du kan inte hämta användare utan att vara inloggad som admin'
    );

    const user = await UserModel.findById(req.params.id);
    res.status(200).json(user);
  }
);

// create a new user
export const addUser = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const validEmail = /^.+\@\S+\.\S+$/;
    if (!req.body.email || !req.body.email.match(validEmail)) {
      res.status(400);
      throw new Error('Du måste ange en giltig epostadress');
    }

    const userData = {
      email: req.body.email,
      password: await argon2.hash(req.body.password),
      isAdmin: false,
    };

    const doesUserExist = await UserModel.findOne({ email: req.body.email });
    if (doesUserExist) {
      res.status(400);
      throw new Error('Användare finns redan registrerad');
    }

    const user = new UserModel(userData);
    await user.save();
    res.status(200).json(user);
    console.log(userData);
  }
);

// login user

export const loginUser = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      res.status(401);
      throw new Error('Fel användarnamn eller lösenord');
    }

    let matchPassword = await argon2.verify(user.password, password);
    if (!matchPassword) {
      res.status(401);
      throw new Error('Fel användarnamn eller lösenord');
    }

    if (req.session) {
      req.session.user = user;

      console.log(`inloggad som ${user?.email}`);
      res.status(200).json({
        email: user.email,
        isAdmin: user.isAdmin,
      });
    }
  }
);

export const logoutUser = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    req.session = null;
    res.status(200).json({ message: 'Du är nu utloggad' });
  }
);

// update user by id
export const updateUser = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    if (req.session?.user.id !== id && req.session?.user?.isAdmin !== true) {
      res.status(403);
      throw new Error('Endast administratörer kan uppdatera andra användare');
    }

    const userData = {
      email: req.body.email,
      password: await argon2.hash(req.body.password),
      isAdmin: false,
    };

    await UserModel.findByIdAndUpdate(id, userData);

    console.log('updateUser');

    res.status(200).json({
      new: userData,
    });
  }
);

// delete user by id
export const deleteUser = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    assertIsAdmin(
      req,
      res,
      'Du kan inte ta bort användare utan att vara inloggad som admin'
    );

    const user = await UserModel.findByIdAndDelete(req.params.id);
    console.log('delete user');
    res.status(200).json(user);
  }
);

export const getCurrentUser = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    if (req.session?.user !== undefined) {
      res.status(200).json({
        email: req.session.user.email,
        isAdmin: req.session.user.isAdmin,
      });
    } else {
      res.status(204).send();
    }
  }
);
