import React, { useState } from "react";
import ChatUI from "./chatUI";
import { chatContext } from "./context";

const Influancer = () => {
  const [currentOrder, setCurrentOrder] = useState({});

  return (
    <>
      <chatContext.Provider value={{ currentOrder, setCurrentOrder }}>
        <ChatUI />
      </chatContext.Provider>
    </>
  );
};

export default Influancer;
