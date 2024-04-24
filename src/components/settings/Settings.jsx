import React from "react";
import useUsersContext from "../../context/useUsersContext";
import SettingsField from "./SettingsField";
import PictureUploadField from "./PictureUploadField";
import PasswordField from "./PasswordField";
import { useNavigate } from "react-router-dom";

export default function Settings({ setIsSettingsOpen }) {
  const { deleteCurrentUser, currentUser, logoutAuth, currentUserData } =
    useUsersContext();


  return (
    <div className="w-full h-full flex flex-col justify-center items-center bg-[#9BA4B5]">
      <section className="w-[100%] h-[75%] flex flex-wrap justify-around text-sm overflow-y-auto overflow-hidden">
        <div className="h-[30%] w-full py-4 px-10 flex flex-wrap items-center md:justify-start justify-center">
          <img
            className=" md:h-full h-[80%] aspect-square rounded-full"
            src={
              currentUserData?.profilePic ||
              "public/assets/profile-placeholder.png"
            }
            alt="profile-image"
          />

          <h1 className="text-white md:text-5xl text-3xl px-10">
            {currentUserData.nickname}
          </h1>
        </div>
        <SettingsField
          type={"email"}
          currentUser={currentUser}
          placeholder={"New Email..."}
          fieldKey={"email"}
        />
        <SettingsField
          currentUser={currentUser}
          placeholder={"New Nickname..."}
          fieldKey={"nickname"}
          pattern={"^[A-Za-z][A-za-z0-9]*"}
        />
        <PasswordField />

        <PictureUploadField />
      </section>
      <section className="w-full h-[25%] flex flex-wrap justify-around items-center">
        <button
          onClick={() => setIsSettingsOpen((prev) => !prev)}
          className="bg-[#1C2B2D] p-4 rounded-lg h-[60px] min-w-fit w-[200px]"
        >
          Go Back To Chat
        </button>
        <button
          onClick={() => logoutAuth()}
          className="bg-[#1C2B2D] p-4 rounded-lg h-[60px] min-w-fit w-[200px]"
        >
          Logout
        </button>
        <button
          onClick={async () => await deleteCurrentUser(currentUser)}
          className="bg-[#d81212] p-4 rounded-lg h-[60px] min-w-fit w-[200px]"
        >
          Delete Account
        </button>
      </section>
    </div>
  );
}
