import React from "react";
import useUsersContext from "../../context/useUsersContext";
import { useState } from "react";
import { useEffect } from "react";
import { collection, getDocs, where } from "firebase/firestore";
import { dataBase } from "../../Firebase/FirebaseConfig";
import SettingsField from "./SettingsField";

export default function Settings({ setIsSettingsOpen }) {
  const { deleteUserFromDB, currentUser, getUser, logoutAuth } =
    useUsersContext();

  const [currentUserData, setCurrentUserData] = useState(null);
  useEffect(() => {
    getCurrentUserData();
  }, [currentUser]);

  const getCurrentUserData = async () => {
    const userData = await getUser(currentUser.uid);
    setCurrentUserData(userData);
  };

  // console.log(currentUserData);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <section className="w-[85%] h-[85%] border">
        <SettingsField
          type={"email"}
          currentUser={currentUser}
          placeholder={"New Email..."}
          fieldKey={"email"}
        />
        <SettingsField
          type={"text"}
          currentUser={currentUser}
          placeholder={"New Nick Name..."}
          fieldKey={"nickName"}
          pattern={"^[A-Za-z]"}
        />
        <SettingsField
          type={"text"}
          currentUser={currentUser}
          placeholder={"New First Name..."}
          fieldKey={"firstName"}
          pattern={"[A-Za-z]+"}
        />
        <SettingsField
          type={"text"}
          currentUser={currentUser}
          placeholder={"New Last Name..."}
          fieldKey={"lastName"}
          pattern={"[A-Za-z]+"}
        />
        <SettingsField
          type={"tel"}
          currentUser={currentUser}
          placeholder={"New Phone Number..."}
          fieldKey={"phoneNumber"}
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        />
        <button
          onClick={() => setIsSettingsOpen((prev) => !prev)}
          className="bg-black p-4 rounded-lg"
        >
          Go Back To Chat
        </button>
        <button
          onClick={() => deleteUserFromDB(currentUser)}
          className="bg-black p-4 rounded-lg"
        >
          delete{" "}
        </button>
      </section>
    </div>
  );
}
