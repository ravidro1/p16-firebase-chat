import React, { useEffect, useRef, useState } from "react";

export default function SignUpInput({
  typeOfInput = "text",
  placeholder,
  setInputsValues,
  formDataKey,
  keysWithErrors,
  minLength = null,
  maxLength = null,
  pattern = null,
  isValid_important = true,
  setPassword,
}) {
  const [isValid, setIsValid] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef();

  useEffect(() => {
    const isInputValid = inputRef?.current?.checkValidity();
    if (
      isValid_important &&
      isInputValid &&
      keysWithErrors[formDataKey] == null
    ) {
      return setIsValid(true);
    }
    setIsValid(false);
  }, [inputValue, keysWithErrors]);

  useEffect(() => {
    setInputsValues((prev) => {
      return { ...prev, [formDataKey]: inputValue };
    });
  }, [inputValue]);

  
  return (
    <div className="flex w-[350px] flex-col max-w-[95%]">
      <div className="w-full relative flex justify-center">
        <input
          ref={inputRef}
          pattern={pattern}
          className={
            "h-[45px] w-full p-2  text-black " +
            (inputValue.length > 0 && !isValid && "border-2 border-red-500 ")
          }
          placeholder={placeholder}
          type={typeOfInput}
          name={formDataKey}
          required
          minLength={minLength}
          maxLength={maxLength}
          onChange={(e) => {
            setInputValue(e.target.value);
            if (formDataKey == "password") setPassword(e.target.value);
          }}
        />
        <span
          className={
            "" +
            (inputValue.length > 0 &&
              (isValid ? "customValid-signUp" : "customInvalid-signUp"))
          }
        />
      </div>
      {typeOfInput == "tel" && (
        <div className=" flex justify-center">
          {" "}
          <small className="w-[90%]"> Format - 000-000-0000 </small>
        </div>
      )}
      {keysWithErrors[formDataKey] != null && (
        <p className="text-red-600"> {keysWithErrors[formDataKey]}</p>
      )}
    </div>
  );
}
