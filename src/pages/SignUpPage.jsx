import React from "react";
import { useState } from "react";
// import emailjs from "@emailjs/browser";
import SignUpInput from "../components/LoginAndSignUp/SignUpInput";

import useUsersContext from "../context/useUsersContext";
import useChatContext from "../context/useChatContext";

import { useNavigate } from "react-router-dom";

function SignUpPage() {
  const navigate = useNavigate();
  const { signUpUser, checkUniqueField } = useUsersContext();
  const { getImageByName } = useChatContext();

  const [keysWithErrors, setKeysWithErrors] = useState({});
  const [isServerErrorMessageShown, setIsServerErrorMessageShown] =
    useState(false);

  const register = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const formatData = {};
    const tempKeysWithErrors = {};

    for (let entry of data.entries()) {
      formatData[entry[0]] = String(entry[1]).trim();
    }

    const isEmailFieldUnique = await checkUniqueField(
      formatData["email"],
      "email"
    );
    const isPhoneNumberFieldUnique = await checkUniqueField(
      formatData["phoneNumber"],
      "phoneNumber"
    );
    const isNickNameFieldUnique = await checkUniqueField(
      formatData["nickName"],
      "nickName"
    );

    if (!isEmailFieldUnique) tempKeysWithErrors["email"] = `email already taken`;
    if (!isPhoneNumberFieldUnique)
      tempKeysWithErrors["phoneNumber"] = `phoneNumber already taken`;
    if (!isNickNameFieldUnique)
      tempKeysWithErrors["nickName"] = `nickName already taken`;

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
        const defaultProfilePictureURL = await getImageByName(
          "profile-pic.png"
        );

        tempUserData.profilePic = defaultProfilePictureURL;

        await signUpUser(tempUserData);

        event.target.reset();

        setPassword("");

        navigate("/");
      } catch (error) {
        console.error(error);
        setIsServerErrorMessageShown(true);
      }
    } else {
      setKeysWithErrors(tempKeysWithErrors);
    }
  };

  const [password, setPassword] = useState("");

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h1 className="m-2 text-center text-6xl text-white">SIGN UP</h1>

      <form
        name="signUp_form"
        id="signUp_form"
        onChange={() => {
          setKeysWithErrors({});
          setIsServerErrorMessageShown(false);
        }}
        onSubmit={register}
        className="flex h-[80%] w-[80%] flex-col items-center justify-around overflow-hidden rounded-lg bg-[#E6D5B8] shadow-2xl sm:w-[60%] lg:w-[40%]"
      >
        {isServerErrorMessageShown && (
          <h1 className="text-red-500"> Server Error Try Again </h1>
        )}
        <SignUpInput
          formDataKey={"email"}
          placeholder={"Email"}
          typeOfInput="email"
          keysWithErrors={keysWithErrors}
        />
        <SignUpInput
          formDataKey={"password"}
          placeholder={"Password"}
          typeOfInput="password"
          keysWithErrors={keysWithErrors}
          setPassword={setPassword}
          minLength={8}
          maxLength={20}
        />
        {/* <SignUpInput
          formDataKey={"verifyPassword"}
          placeholder={"Verify Password"}
          typeOfInput="password"
          keysWithErrors={keysWithErrors}
          pattern={password}
        /> */}
        <SignUpInput
          formDataKey={"nickName"}
          placeholder={"Nick Name"}
          typeOfInput="text"
          keysWithErrors={keysWithErrors}
          pattern={"^[A-Za-z][A-za-z0-9]*"}
        />
        <SignUpInput
          formDataKey={"firstName"}
          placeholder={"First Name"}
          typeOfInput="text"
          keysWithErrors={keysWithErrors}
          pattern={"[A-Za-z]+"}
        />
        <SignUpInput
          formDataKey={"lastName"}
          placeholder={"Last Name"}
          typeOfInput="text"
          keysWithErrors={keysWithErrors}
          pattern={"[A-Za-z]+"}
        />
        <SignUpInput
          formDataKey={"phoneNumber"}
          placeholder={"Phone number"}
          typeOfInput="tel"
          keysWithErrors={keysWithErrors}
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        />
        <button className="m-6 w-[80%] bg-[#1C2B2D] px-4 py-2 text-2xl text-white hover:bg-[#1C2B2Dcc]">
          Sign-Up
        </button>{" "}
      </form>

      <button
        onClick={() => navigate("/")}
        className="m-6 w-[50] bg-[#1C2B2D] px-4 py-2 text-2xl text-white hover:bg-[#1C2B2Dcc] sm:w-[40%] lg:w-[25%]"
      >
        RETURN TO LOGIN
      </button>
    </div>
  );
}

export default SignUpPage;
