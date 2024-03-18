import { ItemModel } from "../schemas/itemSchema.js";
import { OrderModel } from "../schemas/orderSchema.js";
import { ReviewModel } from "../schemas/reviewSchema.js";
export const sendRating = async (id, rating, review, user) => {
  try {
    const newReview = new ReviewModel({
      itemId: id,
      name: user.name,
      rating: rating,
      value: review,
    });
    await newReview.save();

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
