import { errorMsgs } from "../constants/constants";
import { generate } from "../utils/generateToken";
import User, { UserSchemaType } from "./user-schema";
import { hash, compare } from "bcrypt";

export const postUser = async (reqBody: Request) => {
  const user = new User(reqBody);
  const { password } = user;

  if (user.isModified("password")) {
    user.password = await hash(password, 8);
  }
  await User.create(user);

  return user;
};
export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error(errorMsgs.emailLoginError);
  }
  const isMatch = await compare(password, user.password);

  if (!isMatch) {
    throw new Error(errorMsgs.passError);
  }
  const token = await generate(user);

  return { user, token };
};
