import React, { useState } from "react";

import { updateEmail } from "firebase/auth";
import { useRef } from "react";
import { useEffect } from "react";
import useUsersContext from "../../context/useUsersContext";

export default function SettingsField({
  fieldKey,
  placeholder,
  type = "text",
  pattern = null,
  currentUser,
}) {
  const { checkUniqueField, updateUser } = useUsersContext();

  const [inputValue, setInputValue] = useState("");

  const [errorMessage, setErrorMessage] = useState();

  checkUniqueField;
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
      await updateUser(currentUser.uid, {
        [fieldKey]: inputValue,
      });

      if (fieldKey == "email") await updateEmail(currentUser, inputValue);
      setInputValue("");

      console.log("field changed");
    } catch (error) {
      console.log(error);
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
    <div className="w-[400px] max-w-[90%] flex flex-col xl:m-5 m-3">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex xl:h-[60px] h-[45px] relative"
      >
        <input
          ref={inputRef}
          pattern={pattern}
          className="w-[70%]  rounded-l-lg h-[100%] p-4"
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
          className="w-[30%] h-[100%] rounded-r-lg bg-[#1C2B2D] p-2"
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
