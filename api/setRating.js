import { ItemModel } from "../schemas/itemSchema.js";
import { OrderModel } from "../schemas/orderSchema.js";
export const sendRating = async (id, rating, user) => {
  try {
    await ItemModel.findByIdAndUpdate(id, {
      $inc: { ratingCount: 1, rating: rating },
    });
    await OrderModel.updateMany(
      { "items.item": id, "user.name": user.name },
      { $set: { "items.$.rated": true, "items.$.rating": rating } }
    );

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
