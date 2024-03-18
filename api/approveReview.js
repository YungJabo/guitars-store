import { ReviewModel } from "../schemas/reviewSchema.js";

export const approveReview = async (id) => {
  try {
    await ReviewModel.findByIdAndUpdate(id, { approved: true });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
