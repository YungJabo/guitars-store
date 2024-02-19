import { ItemModel } from "../schemas/itemSchema.js";
export const getItems = async () => {
  let items = await ItemModel.find();
  items = items.map((item) => {
    const image64 = item.img.data.toString("base64");
    const imageUrl = `data:${item.img.imgType};base64,${image64}`;
    return {
      ...item.toObject(),
      img: imageUrl,
    };
  });

  return items;
};
