import React from "react";
import { useState } from "react";
import useUsersContext from "../../context/useUsersContext";
import { dataBase } from "../../Firebase/FirebaseConfig";
import { doc, updateDoc } from "firebase/firestore";

export default function SendMessage({ roomData }) {
  const [messageValue, setMessageValue] = useState("");

  const { currentUser } = useUsersContext();

  const send = async () => {
    if (!messageValue) return;
    try {
      console.log(roomData);
      const lastMessages = roomData.messages;
      const newLastMessages = [
        ...lastMessages,
        {
          content: messageValue,
          user_id: currentUser.uid,
          time: new Date().getTime(),
        },
      ];

      await updateDoc(doc(dataBase, "chatRoom", roomData.uid), {
        messages: newLastMessages,
      });

      setMessageValue("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="w-full h-full">
      {" "}
      <input
        onChange={(e) => setMessageValue(e.target.value)}
        value={messageValue}
        placeholder="Message..."
        className="w-[80%] h-[100%] p-3"
        type="text"
      />
      <button onClick={() => send()} className="w-[20%] h-[100%] bg-slate-950">
        {" "}
        SEND{" "}
      </button>
    </form>
  );
}
