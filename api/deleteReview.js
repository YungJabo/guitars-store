import { ReviewModel } from "../schemas/reviewSchema.js";

export const deleteReview = async (id) => {
  try {
    const result = await ReviewModel.deleteOne({ _id: id });
    return result.deletedCount === 1;
  } catch (error) {
    console.log(error);
    return false;
  }
};
