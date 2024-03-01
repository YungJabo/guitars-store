import { UserModel } from "../schemas/userSchema.js";
export const changeRole = async (id, role) => {
  try {
    await UserModel.findByIdAndUpdate(id, { role: role });
    console.log(`Role updated successfully for user with id ${id}`);
  } catch (error) {
    console.error("Error updating role:", error);
    throw error;
  }
};
