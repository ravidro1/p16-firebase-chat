import React, { useState, createContext, useEffect } from "react";

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, dataBase } from "../firebase/config";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import FirebaseUsersHandler from "../firebase/FirebaseUsersHandler";

export const UsersContext = createContext();

const UsersContextData = () => {
  const { updateUser, allUsersData, deleteCurrentUser, signUpUser, getUser } =
    FirebaseUsersHandler();

  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserData, setCurrentUserData] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    let unsub = () => {};

    if (currentUser) {
      unsub = onSnapshot(doc(dataBase, "users", currentUser.uid), (doc) => {
        setCurrentUserData(doc.data());
      });
    }
    return () => unsub();
  }, [currentUser]);

  const loginAuth = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logoutAuth = () => {
    return signOut(auth);
  };

  const getUserRooms = async () => {
    const currentUserData = await getUser(currentUser.uid);
    const arrayOfUsers = [];

    currentUserData.lastUsersIDs.forEach((user_id) => {
      allUsersData.forEach((user) => {
        if (user_id == user.uid) arrayOfUsers.push(user);
      });
    });
    return arrayOfUsers;
  };

  const checkUniqueField = async (key, inputValue) => {
    const field = query(
      collection(dataBase, "users"),
      where(key, "==", inputValue)
    );

    try {
      const querySnapshot = await getDocs(field);
      const arrayOfUsers = [];

      querySnapshot.forEach((user) => {
        arrayOfUsers.push(user.data());
      });
      if (arrayOfUsers.length > 0) return false;
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return {
    currentUser,
    currentUserData,

    updateUser,
    allUsersData,
    deleteCurrentUser,
    signUpUser,
    getUser,

    loginAuth,
    logoutAuth,

    getUserRooms,
    checkUniqueField,
  };
};

export default function UsersContextProvider({ children }) {
  const value = UsersContextData();
  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
}
