import React, { useContext } from "react";
import { data } from "../utils/dummaydata.js";
import { chatContext } from "./context.js";

const Chats = ({ status }) => {
  const {currentOrder,setCurrentOrder} = useContext(chatContext)
  
  const filteredOrders = data.filter((order) => {
    if (status === "request") {
      return order.order_status === "INITIATED";
    } else if (status === "pending") {
      return order.order_status === "REJECTED";
    } else if (status === "completed") {
      return order.order_status === "ORDER_COMPLETE";
    }
    return true;
  });
  const handleClick = (order) =>{
    setCurrentOrder(order)
  }
  return (
    <div>
      {filteredOrders.map((order) => (
        <div
        onClick={() => handleClick(order)}
          key={order.order_id}
          className={`message-container flex border-b py-4 px-4 ${order.order_id === currentOrder.order_id? "bg-slate-200":""}`}
        >
          <div className="image-container w-12 h-12 bg-red-600 border rounded-full overflow-hidden">
            <img
              src={order?.Influencer?.avatar_url}
              alt="image"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="message font-semibold pl-4">
            <h1>{order?.Influencer?.full_name}</h1>
            <p className="text-gray-400">{order?.Package?.content_type}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
