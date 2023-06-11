import React from "react";

export default function OneMessage({ message, isSenderCurrentUser }) {
  // console.log(message);
  const getFormatTime = (messageTime) => {
    const dateObj = new Date(messageTime);
    const hours = String(dateObj.getHours());
    const minutes = String(dateObj.getMinutes());
    const getClock =
      (hours.length > 1 ? hours : "0" + hours) +
      ":" +
      (minutes.length > 1 ? minutes : "0" + minutes);

    const time =
      dateObj.getDate() +
      "/" +
      dateObj.getMonth() +
      "/" +
      dateObj.getFullYear() +
      " - " +
      getClock;

    return time;
  };

  return (
    <div
      className={
        "w-full h-full p-2 rounded-lg " +
        (isSenderCurrentUser ? "bg-teal-500" : "bg-blue-700")
      }
    >
      <p>{message.content}</p>
      <p>{getFormatTime(message.time)}</p>
    </div>
  );
}
