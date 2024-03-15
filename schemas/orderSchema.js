import { Schema } from "mongoose";
import { model } from "mongoose";

const orderSchema = new Schema({
  items: [
    {
      item: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "item",
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      rated: {
        type: Boolean,
        required: true,
        default: false,
      },
      rating: {
        type: Number,
        required: true,
        default: 0,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  creationDate: {
    type: Date,
    default: () => {
      const currentDate = new Date();
      currentDate.setHours(currentDate.getHours() + 3);
      return currentDate;
    },
  },
  user: {
    userEmail: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },

  address: {
    type: String,
    required: true,
  },
});

export const OrderModel = model("order", orderSchema, "orders");
