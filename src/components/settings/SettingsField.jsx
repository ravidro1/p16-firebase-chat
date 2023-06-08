import React, { useState } from "react";
import { auth, dataBase } from "../../Firebase/FirebaseConfig";
import {
  and,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { updateEmail } from "firebase/auth";
import { useRef } from "react";
import { useEffect } from "react";

export default function SettingsField({
  fieldKey,
  placeholder,
  type,
  pattern,
  currentUser,
}) {
  const [inputValue, setInputValue] = useState("");

  const checkUniqueField = async (key, inputValue) => {
    const field = query(
      collection(dataBase, "users"),
      where(key, "==", inputValue)
    );

    try {
      const querySnapshot = await getDocs(field);
      const arrayOfUsers = [];

      querySnapshot.forEach((user) => {
        if (user.data().uid != currentUser.uid) arrayOfUsers.push(user.data());
      });
      console.log(arrayOfUsers);
      if (arrayOfUsers.length > 0) return false;
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const [errorMessage, setErrorMessage] = useState();

  const updateField = async () => {
    if (!inputValue) return;
    let fieldUnique = false;
    if (
      fieldKey == "email" ||
      fieldKey == "phoneNumber" ||
      fieldKey == "nickName"
    ) {
      console.log(13213);
      fieldUnique = await checkUniqueField(fieldKey, inputValue);
      console.log(fieldUnique);
    } else fieldUnique = true;
    console.log(4);

    if (!fieldUnique) {
      console.log(4);
      setErrorMessage(`${fieldKey} already taken`);
      return;
    }
    console.log(5);

    try {
      await updateDoc(doc(dataBase, "users", currentUser.uid), {
        [fieldKey]: inputValue,
      });
      // if (fieldKey == "email") await updateCurrentUser();
      if (fieldKey == "email") await updateEmail(currentUser, inputValue);
      setInputValue("");
      // if (fieldKey == "email") await updateEmail(auth.currentUser, inputValue);
      console.log(111);
    } catch (error) {
      console.log(222);
      setErrorMessage(`something went wrong`);
    }
  };

  const [isValid, setIsValid] = useState(false);

  const inputRef = useRef();

  useEffect(() => {
    const isInputValid = inputRef?.current?.checkValidity();
    if (isInputValid && !errorMessage) {
      return setIsValid(true);
    }
    setIsValid(false);
  }, [inputValue, errorMessage]);

  return (
    <div className="w-[400px] h-[60px] flex flex-col">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex h-[80%] relative"
      >
        <input
          ref={inputRef}
          pattern={pattern}
          className="w-[75%]  rounded-l-lg h-[100%] p-4"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setErrorMessage("");
          }}
          type={type}
          required
        />
        <button
          onClick={updateField}
          className="w-[25%] h-[100%] rounded-r-lg bg-black p-2"
        >
          {" "}
          Update Field{" "}
        </button>
        <span
          className={
            "" +
            (inputValue.length > 0 &&
              (isValid ? "customValid-signUp" : "customInvalid-signUp"))
          }
        />
      </form>

      {type == "tel" && (
        <div className=" flex justify-center">
          {" "}
          <small className="w-[90%]"> Format - 000-000-0000 </small>
        </div>
      )}
      {errorMessage != null && <p className="text-red-600"> {errorMessage}</p>}
    </div>
  );
}
