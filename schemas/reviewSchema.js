import { Schema } from "mongoose";
import { model } from "mongoose";

const reviewSchema = new Schema({
  itemId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  value: {
    type: String,
  },
  approved: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export const ReviewModel = model("review", reviewSchema, "reviews");
