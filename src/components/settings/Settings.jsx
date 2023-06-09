import React from "react";
import useUsersContext from "../../context/useUsersContext";
import { useState } from "react";
import { useEffect } from "react";
import SettingsField from "./SettingsField";
import PictureUploadField from "./PictureUploadField";
import PasswordField from "./PasswordField";
import { storage } from "../../Firebase/FirebaseConfig";
import { deleteObject, ref } from "firebase/storage";

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

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <section className="w-[100%] h-[80%]  flex flex-wrap justify-around text-sm">
        <SettingsField
          type={"email"}
          currentUser={currentUser}
          placeholder={"New Email..."}
          fieldKey={"email"}
        />
        <SettingsField
          currentUser={currentUser}
          placeholder={"New Nick Name..."}
          fieldKey={"nickName"}
          pattern={"^[A-Za-z]"}
        />
        <PasswordField />

        <SettingsField
          currentUser={currentUser}
          placeholder={"New First Name..."}
          fieldKey={"firstName"}
          pattern={"[A-Za-z]+"}
        />
        <SettingsField
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
        <PictureUploadField />
      </section>
      <button
        onClick={() => {
          (async () => {
            const imageRef = ref(storage, currentUser.uid);
            await deleteObject(imageRef)
              .then(() => console.log("success"))
              .catch((error) => console.error(error));
          })();
        }}
      >
        sadadasdasdasd
      </button>

      <section className="w-full h-[20%] flex justify-around items-center">
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
          onClick={() => deleteUserFromDB(currentUser)}
          className="bg-[#d81212] p-4 rounded-lg h-[60px] min-w-fit w-[200px]"
        >
          Delete Account
        </button>
      </section>
    </div>
  );
}
