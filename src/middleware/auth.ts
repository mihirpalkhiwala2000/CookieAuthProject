import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../users/user-schema";
import { errorMsgs } from "../constants/constants";

const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<undefined> => {
  try {
    const token = req.header("Cookie")?.replace("token=", "") as string;

    const decoded = jwt.verify(
      token,
      process.env.JWT_CODE as string
    ) as jwt.JwtPayload;

    const user = await User.findOne({
      _id: decoded._id,
    });

    if (!user) {
      throw new Error();
    }
    req.body.token = token;
    req.body.user = user;
    next();
  } catch (e) {
    res.send(errorMsgs.unauthorized);
  }
};

export default auth;
