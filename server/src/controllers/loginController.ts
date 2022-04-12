import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../configs/config";
import User from "../models/user";

const ADMIN = {
  username: "mehdi",
  password: "admin",
};

export const LoginController = {
  login(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;

    if (ADMIN.username === username && ADMIN.password === password) {
      const accessToken = jwt.sign({ username }, config.accessTokenSecret);

      return res.json({
        accessToken,
      });
    } else {
      return res
        .status(401)
        .send({ message: "Username or password incorrect" });
    }
  },
};
