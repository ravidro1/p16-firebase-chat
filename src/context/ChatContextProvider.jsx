import {doc, getDoc, onSnapshot, setDoc, updateDoc} from "firebase/firestore";
import React, {createContext} from "react";
import {useEffect} from "react";
import {useState} from "react";
import {dataBase} from "../Firebase/FirebaseConfig";

export const ChatContext = createContext();

const ChatContextData = () => {
  const [currentChatData, setCurrentChatData] = useState(null);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [userRooms, setUserRooms] = useState(null);

  useEffect(() => {
    let unsub = () => null;
    if (selectedRoomId != null) {
      unsub = onSnapshot(doc(dataBase, "chatRoom", selectedRoomId), (doc) => {
        setCurrentChatData(doc.data());
      });
    }

    return () => {
      unsub();
    };
  }, [selectedRoomId]);

  const updateChatData = async (fields) => {
    return await updateDoc(
      doc(dataBase, "chatRoom", currentChatData.uid),
      fields
    );
  };

  const getChat = async (chat_id) => {
    return (await getDoc(doc(dataBase, "chatRoom", chat_id))).data();
  };

  const createChat = async (chat_id, fields) => {
    return await setDoc(doc(dataBase, "chatRoom", chat_id), fields);
  };

  return {
    getChat,
    currentChatData,
    selectedRoomId,
    setSelectedRoomId,
    updateChatData,
    createChat,
  };
};

export default function ChatContextProvider({children}) {
  const value = ChatContextData();

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}
