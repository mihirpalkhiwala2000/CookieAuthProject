import { Schema, model } from "mongoose";
import validator from "validator";
import { errorMsgs } from "../constants/constants";
import { ObjectId } from "mongoose";

export interface UserSchemaType {
  name: string;
  email: string;
  password: string;
  _id: ObjectId;
}

const userSchema = new Schema<UserSchemaType>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error(errorMsgs.emailError);
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);
export default User;
