import React, { useState, useEffect } from "react";
import useUsersContext from "../../context/useUsersContext";
import useChatContext from "../../context/useChatContext";
import { dataBase } from "../../firebase/config";
import { doc, onSnapshot } from "firebase/firestore";

export default function ContactItem({ user, selectHandle }) {
  const { getUser, currentUser } = useUsersContext();
  const { getFormatMessageTime } = useChatContext();

  const [thisChat, setThisChat] = useState(null);
  const [lastRoomMessage, setLastRoomMessage] = useState(null);

  useEffect(() => {
    // thisChat &&
    getLastRoomMessage();
  }, [thisChat, user]);

  useEffect(() => {
    const combinedID =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    let unsub = () => null;
    unsub = onSnapshot(doc(dataBase, "chatRoom", combinedID), (doc) => {
      setThisChat(doc.data());
    });

    return () => {
      unsub();
    };
  }, [user]);

  const getLastRoomMessage = async () => {
    try {
      const roomMessages = thisChat.messages;
      const lastMessage = roomMessages.at(-1);
      if (lastMessage?.user_id)
        lastMessage.user = await getUser(lastMessage?.user_id);
      setLastRoomMessage(lastMessage ? lastMessage : null);
    } catch (error) {
      setLastRoomMessage(null);
      console.error(error);
    }
  };

  return (
    <button
      onClick={() => selectHandle(user)}
      className="border-t w-full h-[12.5%] bg-[#7B8FA1] p-2 flex justify-between items-center"
    >
      <section className="h-full w-[20%] flex justify-center items-center">
        <img
          className="h-full aspect-square rounded-full"
          src={user.profilePic}
          alt=""
        />
      </section>
      <section className="h-full w-[30%] flex justify-start items-center">
        <h1 className="overflow-hidden overflow-ellipsis whitespace-nowrap text-xl mx-8 m-0">
          {user.nickName}
        </h1>
      </section>
      <section className="h-full w-[50%] flex flex-col justify-center items-center">
        {lastRoomMessage ? (
          <div className="w-full h-full flex flex-col justify-between">
            <p className="w-full overflow-hidden overflow-ellipsis whitespace-nowrap m-0 text-start">
              <strong>
                {" "}
                {lastRoomMessage?.user_id == currentUser?.uid
                  ? "You"
                  : lastRoomMessage?.user?.nickName}{" "}
              </strong>{" "}
              :{lastRoomMessage?.content}
            </p>
            <p className="w-full flex justify-end text-end">
              {lastRoomMessage
                ? getFormatMessageTime(lastRoomMessage?.time)
                : "No message has been sent yet"}
            </p>
          </div>
        ) : (
          <p className="w-full flex justify-start text-start">
            {"No message has been sent yet"}
          </p>
        )}
      </section>
    </button>
  );
}
