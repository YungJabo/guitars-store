import { ItemModel } from "../schemas/itemSchema.js";
export const updateItem = async (
  title,
  cost,
  category,
  imgData,
  imgType,
  id
) => {
  try {
    let updateFields = {
      title: title,
      cost: cost,
      category: category,
    };
    if (imgData && imgType) {
      updateFields.img = {
        data: imgData,
        imgType: imgType,
      };
    }
    await ItemModel.findByIdAndUpdate(id, updateFields);
  } catch (error) {
    console.log(error);
  }
};
