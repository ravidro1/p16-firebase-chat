import React from "react";
import Header from "./ChatHeader";
import { useEffect } from "react";
import { useState } from "react";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { dataBase } from "../../firebase/FirebaseConfig";
import useUsersContext from "../../context/useUsersContext";
import SendMessage from "./SendMessage";

export default function ChatRoom({ selectedRoomID, allChatsData }) {
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
    <div className="w-full h-full bg-green-900">
      <Header otherUserData={otherUserData} />
      <div className="w-full h-[90%] bg-teal-800 flex justify-center items-center">
        {selectedRoomID ? (
          <div className="w-full h-full">
            <section className="w-full h-[90%] bg-red-500"></section>
            <section className="w-full h-[10%] ">
              <SendMessage
                roomData={roomData}
                selectedRoomID={selectedRoomID}
              />
            </section>{" "}
          </div>
        ) : (
          <h1 className="text-white text-3xl"> selected room : null</h1>
        )}
      </div>
    </div>
  );
}
