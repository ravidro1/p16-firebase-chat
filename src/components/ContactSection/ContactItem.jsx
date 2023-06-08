import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import useUsersContext from "../../context/useUsersContext";

export default function ContactItem({
  user,
  selectHandle,
  getRoomOfCombineUsers,
}) {
  const [lastRoomMessage, setLastRoomMessage] = useState(null);

  const { getUser } = useUsersContext();

  useEffect(() => {
    getRoomOfCombineUsersData();
  }, [user]);

  const getRoomOfCombineUsersData = async () => {
    const roomMessages = (await getRoomOfCombineUsers(user)).messages;
    const lastMessage = roomMessages.at(-1);
    lastMessage.user = await getUser(lastMessage.user_id);
    // console.log(lastMessage);
    setLastRoomMessage(lastMessage);
  };

  const getFormatTime = () => {
    const dateObj = new Date(lastRoomMessage?.time);
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
    <button
      onClick={() => selectHandle(user)}
      className="w-full h-[12.5%] bg-black p-2 flex justify-around items-center"
    >
      <img
        className="h-full aspect-square rounded-full"
        src={user.profilePic}
        alt=""
      />
      <h1 className="text-xl mx-8">{user.nickName}</h1>
      <div className="h-full flex flex-col justify-center items-center">
        <p>
          {lastRoomMessage?.user?.nickName}:{lastRoomMessage?.content}
        </p>
        <p>{getFormatTime()}</p>
      </div>
    </button>
  );
}
