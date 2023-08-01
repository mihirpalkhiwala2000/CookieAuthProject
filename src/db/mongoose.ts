import * as mongoose from "mongoose";
import * as dotenv from "dotenv";
import { successMsgs } from "../constants/constants";

dotenv.config();
mongoose
  .connect(process.env.DB_PORT as string)
  .then(() => console.log(successMsgs.connected));
