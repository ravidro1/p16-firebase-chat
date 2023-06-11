import { doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { dataBase, storage } from "../Firebase/FirebaseConfig";

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
    return await getDoc(doc(dataBase, "chatRoom", chat_id));
  };

  const createChat = async (chat_id, fields) => {
    return await setDoc(doc(dataBase, "chatRoom", chat_id), fields);
  };

  const getImageByName = async (name) => {
    return await getDownloadURL(ref(storage, name));
  };

  const uploadImageToStorage = async (file, newFileName, setProgress) => {
    return new Promise((resolve, reject) => {
      try {
        const storageRef = ref(storage, newFileName);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);
            setProgress(progress);
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            console.log("error while uploading photo", error);
            reject();
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("File available at", downloadURL);
            setProgress(null);

            return resolve(downloadURL);
          }
        );
      } catch (error) {
        console.log(error);
        reject();
      }
    });
  };

  return {
    getChat,
    currentChatData,
    selectedRoomId,
    setSelectedRoomId,
    updateChatData,
    createChat,
    getImageByName,
    uploadImageToStorage,
  };
};

export default function ChatContextProvider({ children }) {
  const value = ChatContextData();

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}
