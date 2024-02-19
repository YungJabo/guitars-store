import { UserModel } from "../schemas/userSchema.js";
import bcrypt from "bcrypt";
import { createTokens } from "./tokens.js";

export const loginUser = async (email, pass) => {
  const existingUser = await UserModel.findOne({ email: email.toLowerCase() });
  if (!existingUser) {
    return false;
  }
  const isValidPassword = await bcrypt.compare(pass, existingUser.pass);
  if (!isValidPassword) {
    return false;
  }
  const accessToken = await createTokens(
    existingUser.email.toLocaleLowerCase()
  );
  return accessToken;
};
