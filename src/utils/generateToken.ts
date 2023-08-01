import * as jwt from "jsonwebtoken";
import User, { UserSchemaType } from "../users/user-schema";

export const generate = async (user: UserSchemaType): Promise<string> => {
  const token = jwt.sign(
    { _id: user._id.toString() },
    process.env.JWT_CODE as string
  );

  return token;
};
