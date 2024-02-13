/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState, useRef, useContext } from "react";
import { CometChat } from "@cometchat-pro/chat";
import { v4 as uuidv4 } from "uuid";
import OrderStatus from "./orderstatus";
import Navigator from "./navigater";
import Status from "./status";
import { chatContext } from "./context";
import { registration } from "./cometchat";



function ChatUI() {
  const { currentOrder, setCurrentOrder } = useContext(chatContext);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const messageContainerRef = useRef(null);
  const inputFileRef = useRef(null);
  const name = currentOrder?.Influencer?.full_name
  const uid = currentOrder?.influnacerduid
  const role = "2"

  useEffect(()=>{
    if(currentOrder?.order_id){
      registration(name,uid,role)
    }
  },[currentOrder])

  useEffect(() => {
    const listenerID = `message_listener_${uuidv4()}`;
    CometChat.addMessageListener(
      listenerID,
      new CometChat.MessageListener({
        onTextMessageReceived: (textMessage) => {
          setMessages((prevMessages) => [...prevMessages, textMessage]);
          scrollToBottom();
        },
      })
    );
    fetchMessageHistory();
    return () => {
      CometChat.removeMessageListener(listenerID);
    };
  }, []);

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  };

  const sendMessage = () => {
    if (text.trim() !== "") {
      // Sending text message
      CometChat.sendMessage(
        new CometChat.TextMessage(
          "user13",
          text.trim(),
          CometChat.RECEIVER_TYPE.USER
        )
      )
        .then((message) => {
          setMessages((prevMessages) => [...prevMessages, message]);
          setText("");
          scrollToBottom();
        })
        .catch((error) =>
          console.log("Text message sending failed with error:", error)
        );
    }

    if (file) {
      // Sending image or file
      const mediaMessage = new CometChat.MediaMessage(
        "user13",
        file,
        CometChat.MESSAGE_TYPE.IMAGE,
        CometChat.RECEIVER_TYPE.USER
      );
      CometChat.sendMediaMessage(mediaMessage)
        .then((message) => {
          setMessages((prevMessages) => [...prevMessages, message]);
          setFile(null);
          scrollToBottom();
        })
        .catch((error) =>
          console.log("Media message sending failed with error:", error)
        );
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

 const fetchMessageHistory = () => {
    const limit = 100;
    const messagesRequest = new CometChat.MessagesRequestBuilder()
      .setUID("user13")
      .setLimit(limit)
      .build();

    messagesRequest
      .fetchPrevious()
      .then((messageList) => {
        setMessages(messageList);
      })
      .catch((error) => {
        console.log("Message fetching failed with error:", error);
      });
  };

  const formatSendTime = (sentAt) => {
    const date = new Date(sentAt);
    return ` ${date.toLocaleTimeString()}`;
  };

  return (
    <div className="flex h-screen w-full flex-row bg-white ">
      {/* Left column for chats */}
      <div className="w-[30%] rounded-lg  my-4 ">
        <div className="w-full  border-b  px-2 py-2">
          <h2 className=" font-bold mb-4 text-[24px]">Chats</h2>
        </div>
        <div className="flex justify-center">
          <Navigator />
        </div>
      </div>

      {/* Center column for message window */}
      <div className="flex-grow rounded-lg border-r border-l">
        <div className="flex flex-row justify-between border-b my-4  px-2 py-2">
          <h2 className=" font-bold mb-4 text-[24px]">
            {currentOrder?.Influencer?.full_name}
          </h2>
          <div>
            <h2 className="text-black font-semibold ">
              {currentOrder?.Package?.content_type}
            </h2>
            <p className="text-gray-400 text-[16px]">
              {currentOrder?.order_id}
            </p>
          </div>
        </div>

        <div
          ref={messageContainerRef}
          className="flex flex-col h-[78%] overflow-y-auto px-3"
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`my-2 ${
                message.sender.uid === "user13" ? "text-left" : "text-right"
              }`}
            >
              {message.type === "text" ? (
                <div
                  className={`inline-block p-2 rounded-lg ${
                    message.sender.uid === uid
                      ? "bg-gray-200 text-black"
                      : "bg-gray-300"
                  }`}
                >
                  {message.text}
                </div>
                 
              ) : (
                <div
                  className={`flex w-full ${
                    message.sender.uid === uid
                      ? "justify-end "
                      : "justify-start"
                  }`}
                >
                  <img
                    src={message.data.url}
                    alt="sent image"
                    className={`max-w-[200px] max-h-[200px] rounded-lg`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            ref={inputFileRef}
          />
          <button
            onClick={() => inputFileRef.current.click()}
            className="px-4 py-2 bg-gray-500 text-white rounded-l"
          >
            Select File
          </button>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow px-2 py-1 border rounded-l"
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 bg-gray-500 text-white rounded-r"
          >
            Send
          </button>
        </div>
      </div>

      {/* Right column for status or files */}
      <div className="w-[20%] rounded-lg">
        <div className="flex justify-between my-4 border-b px-2 py-2">
          <h2 className=" font-bold mb-4 text-[24px] ">Status</h2>
          <Status />
        </div>
        <div className="mt-5">
          <OrderStatus />
        </div>
      </div>
    </div>
  );
}

export default ChatUI;
