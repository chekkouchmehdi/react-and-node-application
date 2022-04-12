import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../configs/config";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, config.accessTokenSecret, (err: any, user: any) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.body.username = user.username;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
