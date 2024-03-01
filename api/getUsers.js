import { UserModel } from "../schemas/userSchema.js";

export const getUsers = async () => {
  try {
    const users = await UserModel.find().select("role name email id");
    return users;
  } catch (error) {
    console.log(error);
  }
};
