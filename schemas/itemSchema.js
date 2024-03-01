import { Schema } from "mongoose";
import { model } from "mongoose";

const itemSchema = new Schema({
  title: {
    type: String,
  },
  cost: {
    type: Number,
  },
  category: {
    type: String,
  },
  img: {
    data: {
      type: Buffer,
    },
    imgType: {
      type: String,
    },
  },
  countOrders: {
    type: Number,
    default: 0,
  },
});

export const ItemModel = model("item", itemSchema, "items");
