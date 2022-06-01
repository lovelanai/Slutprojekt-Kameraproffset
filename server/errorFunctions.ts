import { Request, Response } from 'express';

export function assertIsLoggedIn(req: Request, res: Response, message: string) {
  if (req.session?.user === undefined) {
    res.status(401);
    throw new Error(message);
  }
}

export function assertIsAdmin(req: Request, res: Response, message: string) {
  if (req.session?.user?.isAdmin !== true) {
    res.status(403);
    throw new Error(message);
  }
}
