import { Schema } from "mongoose";
import { model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  pass: {
    type: String,
  },
  accessToken: {
    type: String,
  },
});

export const UserModel = model("user", userSchema, "users");
