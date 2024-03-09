import { ItemModel } from "../schemas/itemSchema.js";
import { OrderModel } from "../schemas/orderSchema.js";
import { getFormattedDate } from "../api/getFormattedDate.js";

export const ordersDto = async (orders) => {
  const allOrders = [];
  try {
    for (const order of orders) {
      const fullOrder = await OrderModel.findById(order._id).populate(
        "items.item"
      );

      let items = fullOrder.items;
      items = items.map((item) => {
        const image64 = item.item.img.data.toString("base64");
        const imageUrl = `data:${item.item.img.imgType};base64,${image64}`;
        delete item.item.img;
        return {
          ...item.toObject(),
          item: { ...item.item.toObject(), img: "" },
          img: imageUrl,
        };
      });

      const correctedOrder = {
        total: fullOrder.total,
        creationDate: getFormattedDate(fullOrder.creationDate),
        items: items,
        address: fullOrder.address,
        _id: fullOrder._id.toString(),
      };
      allOrders.push(correctedOrder);
    }
    return allOrders;
  } catch (error) {
    console.log(error);
    return false;
  }
};
