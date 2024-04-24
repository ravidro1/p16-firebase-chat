import React from "react";
import { useState } from "react";
import SignUpInput from "../components/LoginAndSignUp/SignUpInput";

import useUsersContext from "../context/useUsersContext";

import { useNavigate } from "react-router-dom";

function SignUpPage() {
  const navigate = useNavigate();
  const { signUpUser, checkUniqueField } = useUsersContext();

  const [keysWithErrors, setKeysWithErrors] = useState({});
  const [isServerErrorMessageShown, setIsServerErrorMessageShown] =
    useState(false);

  const [inputsValues, setInputsValues] = useState({
    nickname: "",
    email: "",
    password: "",
    verifyPassword: "",
  });

  const register = async (event) => {
    event.preventDefault();

    const tempKeysWithErrors = {};
    const formatData = {};
    Object.keys(inputsValues).forEach((key) => {
      if (key == "email") inputsValues[key].trim().toLowerCase();
      formatData[key] = inputsValues[key].trim();
    });

    const isEmailFieldUnique = await checkUniqueField(
      "email",
      formatData["email"]
    );
    const isNicknameFieldUnique = await checkUniqueField(
      "nickname",
      formatData["nickname"]
    );

    if (!isEmailFieldUnique)
      tempKeysWithErrors["email"] = `email already taken`;
    if (!isNicknameFieldUnique)
      tempKeysWithErrors["nickname"] = `nickname already taken`;

    if (Object.keys(tempKeysWithErrors).length <= 0) {
      setKeysWithErrors({});
      const tempUserData = {
        profilePic: null,
        accountCreationDate: new Date().getTime(),
      };

      Object.keys(formatData).map((key) => {
        if (key !== "verifyPassword") tempUserData[key] = formatData[key];
      });

      try {
        await signUpUser(tempUserData);
        event.target.reset();
        setPassword("");
        navigate("/");
      } catch (error) {
        // console.error(error);
        setIsServerErrorMessageShown(true);
      }
    } else {
      setKeysWithErrors(tempKeysWithErrors);
    }
  };

  const [password, setPassword] = useState("");

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <form
        name="signUp_form"
        id="signUp_form"
        onChange={() => {
          setKeysWithErrors({});
          setIsServerErrorMessageShown(false);
        }}
        // onSubmit={register}
        className="flex sm:h-[85%] md:h-[75%] flex-col items-center justify-around overflow-hidden sm:rounded-lg bg-[#9BA4B5] shadow-2xl h-full sm:w-[70%] lg:w-[40%] w-full"
      >
        <h1 className="sm:block m-2 text-center text-2xl sm:text-6xl text-white">
          SIGN UP
        </h1>
        {isServerErrorMessageShown && (
          <h1 className="text-red-500"> Server Error Try Again </h1>
        )}
        <SignUpInput
          setInputsValues={setInputsValues}
          formDataKey={"nickname"}
          placeholder={"Nick Name"}
          typeOfInput="text"
          keysWithErrors={keysWithErrors}
          pattern={"^[A-Za-z][A-za-z0-9]*"}
        />
        <SignUpInput
          setInputsValues={setInputsValues}
          formDataKey={"email"}
          placeholder={"Email"}
          typeOfInput="email"
          keysWithErrors={keysWithErrors}
          pattern={"^[A-Za-z][A-za-z0-9]*@[A-Za-z]+.[A-Za-z]{2,}"}
        />
        <SignUpInput
          setInputsValues={setInputsValues}
          formDataKey={"password"}
          placeholder={"Password"}
          typeOfInput="password"
          keysWithErrors={keysWithErrors}
          setPassword={setPassword}
          minLength={8}
          maxLength={20}
        />
        <SignUpInput
          setInputsValues={setInputsValues}
          formDataKey={"verifyPassword"}
          placeholder={"Verify Password"}
          typeOfInput="password"
          keysWithErrors={keysWithErrors}
          pattern={password}
        />
        <button
          // type="submit"
          onClick={register}
          className="m-6 w-[350px] bg-[#1C2B2D] py-2 text-2xl text-white hover:bg-[#1C2B2Dcc] max-w-[95%]"
        >
          SIGN-UP
        </button>{" "}
        <button
          className="w-fit text-lg text-[#002B5B] hover:text-[#655DBB] hover:underline"
          onClick={() => navigate("/")}
        >
          RETURN TO LOGIN
        </button>
      </form>
    </div>
  );
}

export default SignUpPage;
