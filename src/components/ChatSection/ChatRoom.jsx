import React, { useEffect, useState } from "react";
import ChatHeader from "./ChatHeader";
import useUsersContext from "../../context/useUsersContext";
import useChatContext from "../../context/useChatContext";
import SendMessage from "./SendMessage";
import ChatMessagesWindow from "./ChatMessagesWindow";
import loadingIcon from "/assets/loading-icon.svg";

export default function ChatRoom({ setIsSettingsOpen, chatLoading }) {
  const { currentUser, getUser } = useUsersContext();
  const { currentChatData } = useChatContext();

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
    <div className="w-full h-full flex justify-center items-center relative bg-[#DDE6ED]">
      {currentChatData ? (
        <div className="w-full h-full">
          <section className="w-full h-[10%] bg-[#526D82]">
            <ChatHeader otherUserData={otherUserData} />
          </section>
          <section className="w-full h-[80%]">
            <ChatMessagesWindow />
          </section>
          <section className="w-full h-[10%] ">
            <SendMessage />
          </section>{" "}
        </div>
      ) : (
        <h1 className="text-white text-3xl"> Choose A Room To Start Chat</h1>
      )}

      {chatLoading && (
        <div className="absolute w-full h-full bg-[#000000b5] flex justify-center items-center text-white">
          <img
            className="animate-spin w-[90px] aspect-square"
            src={loadingIcon}
            alt=""
          />
        </div>
      )}
    </div>
  );
}
