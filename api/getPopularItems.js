import { ItemModel } from "../schemas/itemSchema.js";

export const getPopularItems = async () => {
  let items = await ItemModel.find({})
    .select("-countOrders")
    .sort({ countOrders: -1 })
    .limit(6);
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
