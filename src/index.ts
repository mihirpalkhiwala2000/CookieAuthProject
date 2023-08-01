import express from "express";
import userRouter from "./users/user-router";
import cookieParser from "cookie-parser";
import("./db/mongoose");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/users", userRouter);
app.use(cookieParser());

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
