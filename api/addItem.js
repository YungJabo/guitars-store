import { ItemModel } from "../schemas/itemSchema.js";
export const addItem = async (title, cost, category, imgData, imgType) => {
  try {
    const newItem = ItemModel({
      title: title,
      cost: cost,
      category: category,
      img: {
        data: imgData,
        imgType: imgType,
      },
    });
    await newItem.save();
  } catch (error) {
    console.log(error);
  }
};
