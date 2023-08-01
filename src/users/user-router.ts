import * as express from "express";
import { loginUser, postUser } from "./user-controller";
import { successMsgs } from "../constants/constants";
import auth from "../middleware/auth";
import User from "./user-schema";
const userRouter = express.Router();
export default userRouter;

userRouter.post("", async (req, res) => {
  try {
    const user = await postUser(req.body);

    res.send({
      data: user,
      message: successMsgs.created,
    });
  } catch (e: any) {
    res.send(e.message);
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await loginUser(email, password);
    res.cookie("token", token, { secure: true });
    res.send({ user: user, token });
  } catch (error: any) {
    res.send(error.message);
  }
});

userRouter.get("/me", auth, async (req, res) => {
  try {
    res.send(req.body.user);
  } catch (e: any) {
    res.send(e.message);
  }
});

userRouter.post("/logout", auth, async (req, res) => {
  try {
    const { user } = req.body;
    res.clearCookie("token");
    res.send({ message: successMsgs.logout, data: user });
  } catch (e: any) {
    res.send(e.message);
  }
});
