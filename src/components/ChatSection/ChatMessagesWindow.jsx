import React, {useEffect, useRef} from "react";
import OneMessage from "./OneMessage";
import useUsersContext from "../../context/useUsersContext";
import useChatContext from "../../context/useChatContext";

export default function ChatMessagesWindow() {
  const {currentUser} = useUsersContext();
  const {currentChatData} = useChatContext();

  const lastMessageRef = useRef();

  useEffect(() => {
    lastMessageRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [currentChatData]);

  return (
    <div className="w-full h-full bg-slate-500 overflow-auto">
      {currentChatData?.messages.map((message, index) => {
        const isSenderCurrentUser = message.user_id == currentUser.uid;
        return (
          <div
            ref={
              index == currentChatData?.messages.length - 1
                ? lastMessageRef
                : null
            }
            className={
              "w-full flex " +
              (isSenderCurrentUser ? "justify-start" : "justify-end")
            }
          >
            <div key={index} className="min-w-[20%] max-w-[45%] w-fit p-3">
              <OneMessage
                isSenderCurrentUser={isSenderCurrentUser}
                message={message}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
