import React from "react";
import ThreeDotsMenu from "./ThreeDotsMenu";
import useUsersContext from "../../context/useUsersContext";

export default function ProfileShow({ setIsSettingsOpen }) {
  const { currentUserData } = useUsersContext();
  return (
    <div className="w-full h-full relative flex justify-between items-center">
      <section className="h-full w-[65%] flex items-center">
        <img
          className="h-full aspect-square rounded-full p-3"
          src={currentUserData?.profilePic}
          alt=""
        />
        <h1 className="text-2xl text-white w-full overflow-hidden overflow-ellipsis whitespace-nowrap m-0 text-start px-4">
          {" "}
          {currentUserData?.nickName}{" "}
        </h1>
      </section>
      <section className="h-full aspect-square">
        <ThreeDotsMenu setIsSettingsOpen={setIsSettingsOpen} />
      </section>
    </div>
  );
}
