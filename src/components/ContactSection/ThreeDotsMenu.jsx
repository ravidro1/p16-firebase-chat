import React from "react";
import useUsersContext from "../../context/useUsersContext";
import threeDots from "/assets/three-dots.svg";
import { useState } from "react";

export default function ThreeDotsMenu({setIsSettingsOpen}) {
  const { logoutAuth } = useUsersContext();

  const [isNavBarOpen, setIsNavBarOpen] = useState(false);
  return (
    <div className="w-full h-full">
      {" "}
      <button
        onClick={() => setIsNavBarOpen(!isNavBarOpen)}
        className="h-full aspect-square p-4"
      >
        <img className="w-full h-full" src={threeDots} alt="" />
      </button>
      <div
        style={{
          height: isNavBarOpen ? "150px" : "0",
          transition: "height 0.1s",
        }}
        className="flex flex-col absolute right-0 bottom-0 translate-y-[100%] bg-slate-900 w-[200px] z-10 rounded-bl-lg overflow-hidden"
      >
        {" "}
        <button
          onClick={() => setIsSettingsOpen((prev) => !prev)}
          className=" p-4 border-b border-white hover:bg-slate-500 w-full h-[50%]"
        >
          Settings{" "}
        </button>
        <button
          onClick={() => logoutAuth()}
          className=" p-4 border-b border-white hover:bg-slate-500  w-full h-[50%]"
        >
          Logout{" "}
        </button>
      </div>
    </div>
  );
}
