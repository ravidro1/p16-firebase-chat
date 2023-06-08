import React from "react";
import ChatHeader from "./ChatHeader";
import { useEffect } from "react";
import { useState } from "react";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { dataBase } from "../../firebase/FirebaseConfig";
import useUsersContext from "../../context/useUsersContext";
import SendMessage from "./SendMessage";
import ChatMessagesWindow from "./ChatMessagesWindow";

export default function ChatRoom({
  selectedRoomID,
  allChatsData,
  setIsSettingsOpen,
}) {
  const [roomData, setRoomData] = useState(null);

  const { currentUser } = useUsersContext();

  const [otherUserData, setOtherUserData] = useState(null);
  const [currentUserData, setCurrentUserData] = useState(null);

  useEffect(() => {
    getRoomData();
  }, [selectedRoomID, allChatsData]);

  useEffect(() => {
    if (roomData) getParticipantsData();
  }, [roomData]);

  const getRoomData = async () => {
    try {
      const data = (
        await getDoc(doc(dataBase, "chatRoom", selectedRoomID))
      ).data();
      setRoomData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getParticipantsData = async () => {
    const participants = roomData.participants;
    const otherUserID = participants.filter(
      (user_id) => user_id != currentUser.uid
    );
    const otherUserDoc = (
      await getDoc(doc(dataBase, "users", otherUserID[0]))
    ).data();

    const currentUserDoc = (
      await getDoc(doc(dataBase, "users", currentUser.uid))
    ).data();

    setOtherUserData(otherUserDoc);
    setCurrentUserData(currentUserDoc);
  };

  return (
    <div className="w-full h-full">
      <ChatHeader
        setIsSettingsOpen={setIsSettingsOpen}
        otherUserData={otherUserData}
      />
      <div className="w-full h-[90%] flex justify-center items-center">
        {roomData ? (
          <div className="w-full h-full">
            <section className="w-full h-[90%]">
              <ChatMessagesWindow roomData={roomData} />
            </section>
            <section className="w-full h-[10%] ">
              <SendMessage roomData={roomData} />
            </section>{" "}
          </div>
        ) : (
          <h1 className="text-white text-3xl"> selected room : null</h1>
        )}
      </div>
    </div>
  );
}
