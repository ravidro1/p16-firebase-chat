import React from "react";
import OneMessage from "./OneMessage";
import useUsersContext from "../../context/useUsersContext";
import { useRef } from "react";
import { useEffect } from "react";

export default function ChatMessagesWindow({ roomData }) {
  const { currentUser } = useUsersContext();

  const lastMessageRef = useRef();

  useEffect(() => {
    lastMessageRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [roomData]);

  return (
    <div className="w-full h-full bg-slate-500 overflow-auto">
      {roomData?.messages.map((message, index) => {
        const isSenderCurrentUser = message.user_id == currentUser.uid;
        return (
          <div
            ref={index == roomData?.messages.length - 1 ? lastMessageRef : null}
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
