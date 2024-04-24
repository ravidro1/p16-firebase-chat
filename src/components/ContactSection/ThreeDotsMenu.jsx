import React from "react";
import useUsersContext from "../../context/useUsersContext";
import threeDots from "/assets/three-dots.svg";
import { useState } from "react";
import { useEffect } from "react";

export default function ThreeDotsMenu({ setIsSettingsOpen }) {
  const { logoutAuth } = useUsersContext();

  const [isNavBarOpen, setIsNavBarOpen] = useState(false);

  const ClickOutsideMenu = (e) => {
    let dataValue = e.target.getAttribute("data-value");
    if (dataValue != "menu-button") setIsNavBarOpen(false);
  };

  useEffect(() => {
    window.addEventListener("click", (e) => ClickOutsideMenu(e));
    return () =>
      window.removeEventListener("click", (e) => ClickOutsideMenu(e));
  }, []);
  return (
    <div className="w-full h-full">
      <button
        data-value="menu-button"
        onClick={() => setIsNavBarOpen(!isNavBarOpen)}
        className="h-full aspect-square p-4"
      >
        <img
          data-value="menu-button"
          className="w-full h-full"
          src={threeDots}
          alt=""
        />
      </button>

      <div
        style={{
          height: isNavBarOpen ? "200px" : "0",
          transition: "height 0.1s",
        }}
        className="w-full flex flex-col absolute right-0 bottom-0 translate-y-[100%] bg-[#526D82]  z-10 overflow-hidden"
      >
        {" "}
        <button
          data-value="menu-button"
          onClick={() => setIsSettingsOpen((prev) => !prev)}
          className=" p-4 border-b border-white hover:bg-slate-500 w-full h-[50%]"
        >
          Settings{" "}
        </button>
        <button
          data-value="menu-button"
          onClick={() => logoutAuth()}
          className=" p-4 border-b border-white hover:bg-slate-500 w-full h-[50%]"
        >
          Logout{" "}
        </button>
      </div>
    </div>
  );
}
