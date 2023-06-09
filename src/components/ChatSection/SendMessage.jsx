import React, {useState} from "react";
import useUsersContext from "../../context/useUsersContext";
import useChatContext from "../../context/useChatContext";

export default function SendMessage({}) {
  const [messageValue, setMessageValue] = useState("");

  const {currentUser} = useUsersContext();
  const {currentChatData, updateChatData} = useChatContext();

  const send = async () => {
    if (!messageValue) return;
    try {
      const lastMessages = currentChatData.messages;
      const newLastMessages = [
        ...lastMessages,
        {
          content: messageValue,
          user_id: currentUser.uid,
          time: new Date().getTime(),
        },
      ];

      await updateChatData({messages: newLastMessages});

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
