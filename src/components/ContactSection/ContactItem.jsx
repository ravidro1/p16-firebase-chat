import React, { useState, useEffect } from "react";
import useUsersContext from "../../context/useUsersContext";
import { dataBase } from "../../Firebase/FirebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import { useRef } from "react";

export default function ContactItem({ user, selectHandle }) {
  const { getUser, currentUser } = useUsersContext();

  const [thisChat, setThisChat] = useState(null);
  const [lastRoomMessage, setLastRoomMessage] = useState(null);

  useEffect(() => {
    thisChat && getLastRoomMessage();
  }, [thisChat]);

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
      console.error(error);
    }
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

  // const itemRef = useRef();

  // const getAttributeFromRef = (ref, attribute) => {
  //   if (ref && ref?.current) {
  //     return ref?.current[attribute];
  //   }
  //   return -1;
  // };

  return (
    <button
      // ref={itemRef}
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
      {/* className="" */}
      <section className="h-full w-[50%] flex flex-col justify-center items-center">
        {lastRoomMessage ? (
          <div className="w-full h-full flex flex-col justify-between">
            <p className="w-full overflow-hidden overflow-ellipsis whitespace-nowrap m-0 text-start">
              <strong> {lastRoomMessage?.user?.nickName} </strong> :
              {lastRoomMessage?.content}
            </p>
            <p className="w-full flex justify-end text-end">
              {lastRoomMessage
                ? getFormatTime(lastRoomMessage)
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
