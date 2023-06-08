import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import FirebaseUsersHandler from "../Firebase/FirebaseUsersHandler";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../Firebase/FirebaseConfig";

export const UsersContext = createContext();

const UsersContextData = () => {
  const {
    updateUser,
    allUsersData,
    deleteUserFromDB,
    signUpUserToDB,
    getUser,
  } = FirebaseUsersHandler();

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => {
      unsub();
    };
  }, []);

  const loginAuth = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logoutAuth = () => {
    return signOut(auth);
  };

  return {
    currentUser,
    setCurrentUser,
    updateUser,
    allUsersData,
    deleteUserFromDB,
    signUpUserToDB,
    getUser,

    loginAuth,
    logoutAuth,
  };
};

export default function UsersContextProvider({ children }) {
  const value = UsersContextData();
  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
}

// const USER_ADDRESS = "USER_ADDRESS";

// useEffect(() => {
//   if (currentUser) {
//     const updateCurrentUser = allUsersData.find(
//       (user) => user.id == currentUser?.id
//     );
//     setCurrentUser(updateCurrentUser);
//   }
// }, [allUsersData]);

// useEffect(() => {
//   const localStorageUser = JSON.parse(localStorage.getItem(USER_ADDRESS));
//   if (localStorageUser != null) setCurrentUser(localStorageUser);
// }, []);

// useEffect(() => {
//   if (currentUser != null)
//     localStorage.setItem(USER_ADDRESS, JSON.stringify(currentUser));
// }, [currentUser]);
