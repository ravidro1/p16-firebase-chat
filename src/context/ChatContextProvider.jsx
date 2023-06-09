import { doc, onSnapshot } from "firebase/firestore";
import React, { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { dataBase } from "../Firebase/FirebaseConfig";

export const ChatContext = createContext();

const ChatContextData = () => {
  const [currentChatData, setCurrentChatData] = useState(null);
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  useEffect(() => {
    let unsub = () => null;
    if (selectedRoomId != null) {
      unsub = onSnapshot(doc(dataBase, "chatRoom", "SF"), (doc) => {
        setCurrentChatData(doc.data());
      });
    }

    return () => {
      unsub();
    };
  }, [selectedRoomId]);

  return { currentChatData, selectedRoomId, setSelectedRoomId };
};

export default function ChatContextProvider({ children }) {
  const value = ChatContextData();

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}
