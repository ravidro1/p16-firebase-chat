import React from "react";
import useChatContext from "../../context/useChatContext";

export default function OneMessage({ message, isSenderCurrentUser }) {
  const { getFormatMessageTime } = useChatContext();

  return (
    <div
      className={
        "min-w-[20%] max-w-[45%] p-2 rounded-lg " +
        (isSenderCurrentUser ? "bg-[#146C94]" : "bg-[#2d3ac5]")
      }
    >
      <p className="text-lg text-white break-all whitespace-break-spaces w-fit">
        {message.content}
      </p>
      <p className="text-sm text-[#ffffffad] ">
        {getFormatMessageTime(message.time)}
      </p>
    </div>
  );
}
