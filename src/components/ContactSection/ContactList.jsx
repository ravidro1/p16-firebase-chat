import React, { useEffect, useState } from "react";
import ContactItem from "./ContactItem";

import useUsersContext from "../../context/useUsersContext";
import useChatContext from "../../context/useChatContext";

export default function ContactList({
  searchValue,
  setSearchValue,
  setChatLoading,
}) {
  const {
    currentUser,
    allUsersData,
    getUserRooms,
    getUser,
    updateUser,
    currentUserData,
  } = useUsersContext();
  const { selectedRoomId, setSelectedRoomId, getChat, createChat } =
    useChatContext();

  const [contactArray, setContactArray] = useState([]);

  useEffect(() => {
    if (searchValue) handleSearch();
    else
      (async () => {
        setContactArray(await getUserRooms());
      })();
  }, [searchValue, allUsersData]);

  const handleSearch = async () => {
    const arrayOfUsers = allUsersData.filter(
      (user) =>
        user.uid != currentUser.uid && user.nickName.includes(searchValue)
    );

    // arrayOfUsers = arrayOfUsers.sort((a,b) => {return });

    setContactArray(arrayOfUsers);
  };

  const selectHandle = async (user) => {
    try {
      setChatLoading(true);
      const combinedID =
        currentUser.uid > user.uid
          ? currentUser.uid + user.uid
          : user.uid + currentUser.uid;

      if (selectedRoomId == combinedID) return;

      const res = await getChat(combinedID);

      console.log(res.exists());
      if (!res.exists()) {
        await createChat(combinedID, {
          messages: [],
          participants: [currentUser.uid, user.uid],
          uid: combinedID,
        });
      }

      const userData = await getUser(user.uid);

      if (currentUserData.lastUsersIDs == null)
        currentUserData.lastUsersIDs = [];
      if (userData.lastUsersIDs == null) userData.lastUsersIDs = [];

      const currentUserFilterLastUsersIDsField =
        currentUserData.lastUsersIDs.filter((user_id) => user_id != user.uid);

      const userFilterLastUsersIDsField = userData.lastUsersIDs.filter(
        (user_id) => user_id != currentUser.uid
      );

      currentUserFilterLastUsersIDsField.unshift(user.uid);
      userFilterLastUsersIDsField.unshift(currentUser.uid);

      await updateUser(currentUser.uid, {
        lastUsersIDs: currentUserFilterLastUsersIDsField,
      });

      await updateUser(user.uid, {
        lastUsersIDs: userFilterLastUsersIDsField,
      });

      setSearchValue("");
      setSelectedRoomId(combinedID);
    } catch (error) {
      console.log(error);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className="w-full h-full overflow-auto">
      {contactArray.map((user, index) => {
        return (
          <ContactItem selectHandle={selectHandle} key={index} user={user} />
        );
      })}
    </div>
  );
}
