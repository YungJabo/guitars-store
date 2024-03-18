import { ItemModel } from "../schemas/itemSchema.js";
export const getItem = async (id) => {
  const item = await ItemModel.findById(id);
  if (!item) {
    return false;
  }
  let avgRating = 0;
  if (item.rating > 0 && item.ratingCount > 0) {
    avgRating = item.rating / item.ratingCount;
    avgRating =
      avgRating % 1 === 0
        ? avgRating.toFixed(0)
        : avgRating.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
  }

  const image64 = item.img.data.toString("base64");
  const imageUrl = `data:${item.img.imgType};base64,${image64}`;

  return {
    ...item.toObject(),
    img: imageUrl,
    rating: avgRating,
  };
};
