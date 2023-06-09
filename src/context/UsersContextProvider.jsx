import React from "react";
import {useEffect} from "react";
import {useState} from "react";
import {createContext} from "react";
import FirebaseUsersHandler from "../Firebase/FirebaseUsersHandler";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {auth} from "../Firebase/FirebaseConfig";

export const UsersContext = createContext();

const UsersContextData = () => {
  const {updateUser, allUsersData, deleteCurrentUser, signUpUser, getUser} =
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
    async () => {
      setCurrentUserData(await getUser(currentUser.uid));
    };
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
  };
};

export default function UsersContextProvider({children}) {
  const value = UsersContextData();
  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
}
