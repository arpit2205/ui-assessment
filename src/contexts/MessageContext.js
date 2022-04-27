import React, { useState, useContext, createContext } from "react";

export const MessageContext = createContext();

export const useMessages = () => useContext(MessageContext);

export const MessageContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [media, setMedia] = useState({});

  const data = {
    messages,
    setMessages,
    media,
    setMedia,
  };

  return (
    <MessageContext.Provider value={data}>{children}</MessageContext.Provider>
  );
};
