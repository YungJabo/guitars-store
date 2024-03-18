import { ReviewModel } from "../schemas/reviewSchema.js";

export const getAllReviews = async () => {
  try {
    const reviews = await ReviewModel.find({ approved: false });
    return reviews;
  } catch (error) {
    console.log(error);
    return false;
  }
};
