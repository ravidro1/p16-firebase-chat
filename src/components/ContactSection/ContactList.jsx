import React from "react";
import ContactItem from "./ContactItem";
import { useState } from "react";
import { useEffect } from "react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { dataBase } from "../../Firebase/FirebaseConfig";
import useUsersContext from "../../context/useUsersContext";
import useChatContext from "../../context/useChatContext";

export default function ContactList({ searchValue }) {
  const { currentUser, allUsersData, getUser } = useUsersContext();
  const { setSelectedRoomId } = useChatContext();
  const [contactArray, setContactArray] = useState([]);

  useEffect(() => {
    if (searchValue) handleSearch();
    else getUserRooms();
  }, [searchValue, allUsersData]);

  const getUserRooms = async () => {
    const currentUserData = await getUser(currentUser.uid);
    const arrayOfUsers = [];

    currentUserData.lastUsersIDs.forEach((user_id) => {
      allUsersData.forEach((user) => {
        if (user_id == user.uid) arrayOfUsers.push(user);
      });
    });
    setContactArray(arrayOfUsers);
  };

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

      const res = await getDoc(doc(dataBase, "chatRoom", combinedID));

      if (!res.exists()) {
        await setDoc(doc(dataBase, "chatRoom", combinedID), {
          messages: [],
          participants: [currentUser.uid, user.uid],
          uid: combinedID,
        });
      }

      const currentUserData = (
        await getDoc(doc(dataBase, "users", currentUser.uid))
      ).data();
      const userData = (await getDoc(doc(dataBase, "users", user.uid))).data();

      const currentUserFilterLastUsersIDsField =
        currentUserData.lastUsersIDs.filter((user_id) => user_id != user.uid);

      const userFilterLastUsersIDsField = userData.lastUsersIDs.filter(
        (user_id) => user_id != currentUser.uid
      );

      currentUserFilterLastUsersIDsField.push(user.uid);
      userFilterLastUsersIDsField.push(currentUser.uid);

      await updateDoc(doc(dataBase, "users", currentUser.uid), {
        lastUsersIDs: currentUserFilterLastUsersIDsField,
      });
      await updateDoc(doc(dataBase, "users", user.uid), {
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
      const res = await getDoc(doc(dataBase, "chatRoom", combinedID));
      return res.data();
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
