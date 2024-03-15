import { ItemModel } from "../schemas/itemSchema.js";
import { convertToObject } from "./convertToObject.js";
export const updateItem = async (
  title,
  cost,
  category,
  imgData,
  imgType,
  id,
  description,
  property
) => {
  const propertyArray = convertToObject(property);
  try {
    let updateFields = {
      title: title,
      cost: cost,
      category: category,
      description: description,
      propertyArray: propertyArray,
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
