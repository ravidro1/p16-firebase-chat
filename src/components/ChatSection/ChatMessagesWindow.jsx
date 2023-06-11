import React, { useEffect, useRef } from "react";
import OneMessage from "./OneMessage";
import useUsersContext from "../../context/useUsersContext";
import useChatContext from "../../context/useChatContext";

export default function ChatMessagesWindow() {
  const { currentUser } = useUsersContext();
  const { currentChatData } = useChatContext();

  const lastMessageRef = useRef();

  useEffect(() => {
    lastMessageRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [currentChatData]);

  return (
    <div className="w-full h-full overflow-y-auto overflow-hidden">
      {currentChatData?.messages.map((message, index) => {
        const isSenderCurrentUser = message.user_id == currentUser.uid;
        return (
          <div
            key={index}
            ref={
              index == currentChatData?.messages.length - 1
                ? lastMessageRef
                : null
            }
            className={
              "w-full flex my-5 px-3 " +
              (isSenderCurrentUser ? "justify-start" : "justify-end")
            }
          >
            <OneMessage
              isSenderCurrentUser={isSenderCurrentUser}
              message={message}
            />
          </div>
        );
      })}
    </div>
  );
}
