import { OrderModel } from "../schemas/orderSchema.js";
import { ItemModel } from "../schemas/itemSchema.js";
import { UserModel } from "../schemas/userSchema.js";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { ordersDto } from "../dto/orders.dto.js";

config();

const secretKey = process.env.JWT_SECRET;

export const getOrders = async (refresh) => {
  const decodedAccess = jwt.verify(refresh, secretKey);
  if (decodedAccess) {
    const { email } = decodedAccess;
    try {
      const user = await UserModel.findOne({ email: email }).populate("orders");
      const userOrders = user.orders;
      const allOrders = await ordersDto(userOrders);
      return allOrders;
    } catch (error) {
      console.log(error);
      return false;
    }
  } else {
    return false;
  }
};
