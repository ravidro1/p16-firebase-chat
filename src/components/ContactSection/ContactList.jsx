import React, {useEffect, useState} from "react";
import ContactItem from "./ContactItem";
import {doc, getDoc, setDoc} from "firebase/firestore";
import {dataBase} from "../../Firebase/FirebaseConfig";
import useUsersContext from "../../context/useUsersContext";
import useChatContext from "../../context/useChatContext";

export default function ContactList({searchValue}) {
  const {
    currentUser,
    allUsersData,
    getUserRooms,
    getUser,
    updateUser,
    currentUserData,
  } = useUsersContext();
  const {setSelectedRoomId, getChat, createChat} = useChatContext();

  const [contactArray, setContactArray] = useState([]);

  useEffect(() => {
    if (searchValue) handleSearch();
    else
      async () => {
        setContactArray(getUserRooms());
      };
  }, [searchValue, allUsersData]);

  const handleSearch = async () => {
    const arrayOfUsers = allUsersData.filter(
      (user) =>
        user.uid != currentUser.uid && user.nickName.includes(searchValue)
    );
    setContactArray(arrayOfUsers);
  };

  const selectHandle = async (user) => {
    try {
      const combinedID =
        currentUser.uid > user.uid
          ? currentUser.uid + user.uid
          : user.uid + currentUser.uid;

      const res = await getChat(combinedID);

      if (!res.exists()) {
        await createChat(combinedID, {
          messages: [],
          participants: [currentUser.uid, user.uid],
          uid: combinedID,
        });
      }

      const userData = await getUser(user.uid);

      const currentUserFilterLastUsersIDsField =
        currentUserData.lastUsersIDs.filter((user_id) => user_id != user.uid);

      const userFilterLastUsersIDsField = userData.lastUsersIDs.filter(
        (user_id) => user_id != currentUser.uid
      );

      currentUserFilterLastUsersIDsField.push(user.uid);
      userFilterLastUsersIDsField.push(currentUser.uid);

      await updateUser(currentUser.uid, {
        lastUsersIDs: currentUserFilterLastUsersIDsField,
      });

      await updateUser(user.uid, {
        lastUsersIDs: userFilterLastUsersIDsField,
      });

      setSelectedRoomId(combinedID);
    } catch (error) {
      console.log(error);
    }
  };

  const getRoomOfCombineUsers = async (user) => {
    const combinedID =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      return await getChat(combinedID);
    } catch (error) {
      return null;
    }
  };

  return (
    <div className="w-full h-full overflow-auto">
      {contactArray.map((user, index) => {
        return (
          <ContactItem
            getRoomOfCombineUsers={getRoomOfCombineUsers}
            selectHandle={selectHandle}
            key={index}
            user={user}
          />
        );
      })}
    </div>
  );
}
