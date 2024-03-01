import { ItemModel } from "../schemas/itemSchema.js";

export const deleteItem = async (id) => {
  try {
    const result = await ItemModel.findByIdAndDelete(id);
    if (!result) {
      throw new Error("Item not found");
    }
    return result;
  } catch (error) {
    console.log(error);
  }
};
