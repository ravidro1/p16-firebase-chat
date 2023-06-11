import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { useEffect, useState } from "react";
import { auth, dataBase, storage } from "./config";
import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
import { ref, deleteObject } from "firebase/storage";

function FirebaseUsersHandler() {
  const [allUsersData, setAllUsersData] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(dataBase, "users"), (snapshot) => {
      const tempAllUserData = [];
      snapshot.docs.forEach((doc) => {
        tempAllUserData.push({ ...doc.data(), id: doc.id });
        setAllUsersData(tempAllUserData);
      });
    });

    return () => {
      unsub();
    };
  }, []);

  const getUser = async (user_id) => {
    return (await getDoc(doc(dataBase, "users", user_id))).data();
  };

  const updateUser = async (user_id, fields) => {
    const userDocRef = doc(dataBase, "users", user_id);
    await updateDoc(userDocRef, fields);
  };

  const signUpUser = async (tempUserData) => {
    let isSuccess = false;
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        tempUserData.email,
        tempUserData.password
      );
      await setDoc(doc(dataBase, "users", res.user.uid), {
        ...tempUserData,
        uid: res.user.uid,
        lastUsersIDs: [],
      });

      isSuccess = true;
    } catch (error) {
      console.log(error);
    }

    return new Promise((resolve, reject) => {
      if (isSuccess) resolve();
      reject();
    });
  };

  const deleteCurrentUser = async (user) => {
    try {
      await deleteObject(ref(storage, user.uid));
    } catch (error) {
      console.error(error);
    }
    try {
      await deleteDoc(doc(dataBase, "users", user.uid));
      // Delete the file from storage
      await deleteUser(user);

      // await deleteDoc(doc(dataBase, "userChat", user.uid));
      //delete chats
    } catch (error) {
      console.error(error);
    }
  };

  return {
    allUsersData,

    updateUser,
    deleteCurrentUser,
    signUpUser,
    getUser,
  };
}

export default FirebaseUsersHandler;
