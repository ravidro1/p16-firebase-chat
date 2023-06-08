import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { useEffect, useState } from "react";
import { auth, dataBase } from "./FirebaseConfig";
import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";

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

  const signUpUserToDB = async (tempUserData) => {
    let isSuccess = false;
    try {
      console.log(tempUserData.email, tempUserData.password);
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
      // await setDoc(doc(dataBase, "userChat", res.user.uid), {});

      isSuccess = true;
    } catch (error) {
      console.log(error);
    }

    return new Promise((resolve, reject) => {
      if (isSuccess) resolve();
      reject();
    });
  };

  const deleteUserFromDB = async (user) => {
    await deleteDoc(doc(dataBase, "users", user.uid));
    await deleteDoc(doc(dataBase, "userChat", user.uid));
    await deleteUser(user);

    // delete picture from storage
  };

  return {
    allUsersData,

    updateUser,
    deleteUserFromDB,
    signUpUserToDB,
    getUser,
  };
}

export default FirebaseUsersHandler;
