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
  role: {
    type: String,
    default: "user",
  },
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "order",
    },
  ],
});

export const UserModel = model("user", userSchema, "users");
