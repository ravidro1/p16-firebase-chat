import { useState } from "react";

export default function ChatHeader({ otherUserData }) {
  return (
    <div className="w-full h-full flex justify-start relative items-center ">
      <img
        className="h-full aspect-square rounded-full p-3"
        src={otherUserData?.profilePic}
        alt=""
      />
      <h1 className="text-white w-[45%] text-2xl overflow-hidden overflow-ellipsis whitespace-nowrap text-start px-4">
        {otherUserData?.nickName}
      </h1>
    </div>
  );
}
