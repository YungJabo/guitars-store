import { UserModel } from "../schemas/userSchema.js";
import bcrypt from "bcrypt";
import { createTokens } from "./tokens.js";

export const addUser = async (name, email, pass) => {
  const existingUser = await UserModel.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    return false;
  }
  const hashedPassword = await bcrypt.hash(pass, 11);
  const accessToken = await createTokens(email.toLowerCase());
  const newUser = UserModel({
    name: name,
    email: email.toLowerCase(),
    pass: hashedPassword,
  });
  await newUser.save();
  return accessToken;
};
