import { ReviewModel } from "../schemas/reviewSchema.js";

export const getReviews = async (id) => {
  try {
    const reviews = await ReviewModel.find({ itemId: id, approved: true });
    return reviews;
  } catch (error) {
    console.log(error);
    return false;
  }
};
