import { Request, Response, NextFunction } from "express";
import { UserModel, User } from "./user-model";

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
  const { email, password } = req.body;

  const doesUserExist = await UserModel.findOne({ email });

  if (doesUserExist) {
    res.status(404);
    console.log("funkar ej");
    throw new Error("Användare finns redan");
  }

  const user = await UserModel.create({
    email: email,
    password: password,
  });

  if (user) {
    res.status(201).json({
      email: user.email,
      password: user.password,
    });
  } else {
    res.status(400);
    throw new Error("Globalt fel");
  }
};
