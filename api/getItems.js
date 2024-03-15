import { ItemModel } from "../schemas/itemSchema.js";
export const getItems = async () => {
  let items = await ItemModel.find();
  let avgRating = 0;
  items = items.map((item) => {
    const image64 = item.img.data.toString("base64");
    const imageUrl = `data:${item.img.imgType};base64,${image64}`;
    if (item.rating > 0 && item.ratingCount > 0) {
      avgRating = item.rating / item.ratingCount;
      avgRating =
        avgRating % 1 === 0
          ? avgRating.toFixed(0)
          : avgRating.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
    }

    return {
      ...item.toObject(),
      img: imageUrl,
      rating: avgRating,
    };
  });

  return items;
};
