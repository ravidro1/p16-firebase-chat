import React from "react";
import ChatHeader from "./ChatHeader";
import {useEffect} from "react";
import {useState} from "react";
import useUsersContext from "../../context/useUsersContext";
import useChatContext from "../../context/useChatContext";
import SendMessage from "./SendMessage";
import ChatMessagesWindow from "./ChatMessagesWindow";

export default function ChatRoom({setIsSettingsOpen}) {
  const {currentUser, getUser} = useUsersContext();
  const {currentChatData} = useChatContext();

  const [otherUserData, setOtherUserData] = useState(null);

  useEffect(() => {
    if (currentChatData) getParticipantsData();
  }, [currentChatData]);

  const getParticipantsData = async () => {
    const participants = currentChatData.participants;
    const otherUserID = participants.filter(
      (user_id) => user_id != currentUser.uid
    );

    const otherUserDoc = await getUser(otherUserID[0]);
    setOtherUserData(otherUserDoc);
  };

  return (
    <div className="w-full h-full">
      <ChatHeader
        setIsSettingsOpen={setIsSettingsOpen}
        otherUserData={otherUserData}
      />
      <div className="w-full h-[90%] flex justify-center items-center">
        {currentChatData ? (
          <div className="w-full h-full">
            <section className="w-full h-[90%]">
              <ChatMessagesWindow />
            </section>
            <section className="w-full h-[10%] ">
              <SendMessage />
            </section>{" "}
          </div>
        ) : (
          <h1 className="text-white text-3xl"> selected room : null</h1>
        )}
      </div>
    </div>
  );
}
