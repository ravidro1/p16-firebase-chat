import React, {useState, useEffect} from "react";
import useUsersContext from "../../context/useUsersContext";
import useChatContext from "../../context/useChatContext";

export default function ContactItem({user, selectHandle}) {
  const [lastRoomMessage, setLastRoomMessage] = useState(null);

  const {getUser} = useUsersContext();
  const {getChat} = useChatContext();

  useEffect(() => {
    getLastRoomMessage();
  }, [user]);

  const getLastRoomMessage = async () => {
    const roomMessages = (await getRoomOfCombineUsers(user)).messages;
    const lastMessage = roomMessages.at(-1);
    lastMessage.user = await getUser(lastMessage.user_id);
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

  const getRoomOfCombineUsers = async (user) => {
    const combinedID =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      return await getChat(combinedID);
    } catch (error) {
      return null;
    }
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
        <p>{getFormatTime(lastRoomMessage)}</p>
      </div>
    </button>
  );
}
