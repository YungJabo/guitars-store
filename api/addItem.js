import { ItemModel } from "../schemas/itemSchema.js";
import { convertToObject } from "./convertToObject.js";
export const addItem = async (
  title,
  cost,
  category,
  imgData,
  imgType,
  description,
  property
) => {
  const propertyArray = convertToObject(property);
  try {
    const newItem = ItemModel({
      title: title,
      cost: cost,
      category: category,
      img: {
        data: imgData,
        imgType: imgType,
      },
      description: description,
      propertyArray: propertyArray,
    });
    await newItem.save();
  } catch (error) {
    console.log(error);
  }
};
