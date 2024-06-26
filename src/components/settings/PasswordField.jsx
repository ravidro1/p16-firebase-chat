import React, { useRef, useState, useEffect } from "react";
import useUsersContext from "../../context/useUsersContext";
import { updatePassword } from "firebase/auth";

export default function PasswordField() {
  const { currentUser, updateUser } = useUsersContext();

  const [passwordValue, setPasswordValue] = useState("");
  const [verifyPasswordValue, setVerifyPasswordValue] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const updatePasswordField = async () => {
    if (!passwordValue || !verifyPasswordValue) return;

    try {
      await updateUser(currentUser.uid, {
        password: passwordValue,
      });
      // console.log(currentUser);
      await updatePassword(currentUser, passwordValue);

      // console.log("new password:" + passwordValue);
      setPasswordValue("");
      setVerifyPasswordValue("");
    } catch (error) {
      console.log(error);
      setErrorMessage(`something went wrong`);
    }
  };
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isVerifyPasswordValid, setIsVerifyPasswordValid] = useState(false);

  const passwordRef = useRef();
  const verifyPasswordRef = useRef();

  useEffect(() => {
    setIsPasswordValid(passwordRef?.current?.checkValidity());
    setIsVerifyPasswordValid(verifyPasswordRef?.current?.checkValidity());
  }, [passwordValue, verifyPasswordValue]);

  return (
    // <form
    //   onSubmit={(e) => e.preventDefault()}
    //   className="flex w-[100%] justify-around flex-wrap "
    // >
    <>
      <section className="w-[400px] max-w-[90%]  flex flex-col xl:m-5 m-3 ">
        <div className="w-[100%] flex xl:h-[60px] h-[45px] relative">
          <input
            ref={passwordRef}
            className="h-[100%] w-[100%] rounded-lg p-4"
            placeholder={"New Password..."}
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
            type={"password"}
            required
            minLength={8}
            maxLength={20}
          />

          <span
            className={
              "" +
              (passwordValue.length > 0 &&
                (isPasswordValid
                  ? "customValid-signUp"
                  : "customInvalid-signUp"))
            }
          />
        </div>
        {errorMessage != null && (
          <p className="text-red-600 px-3"> {errorMessage}</p>
        )}
      </section>

      <section className="w-[400px]  max-w-[90%] flex xl:h-[60px] h-[45px] xl:m-5 m-3 relative">
        <input
          ref={verifyPasswordRef}
          className="w-[70%] rounded-l-lg h-[100%] p-4"
          onChange={(e) => setVerifyPasswordValue(e.target.value)}
          pattern={passwordValue}
          placeholder="Verify New Password..."
          type={"password"}
          required
          value={verifyPasswordValue}
        />
        <button
          onClick={updatePasswordField}
          className="w-[30%] h-[100%] rounded-r-lg bg-[#1C2B2D] p-2"
        >
          {" "}
          Update Field{" "}
        </button>{" "}
        <span
          className={
            "m-0 " +
            (verifyPasswordValue.length > 0 &&
              (isVerifyPasswordValid
                ? "customValid-signUp"
                : "customInvalid-signUp"))
          }
        />
      </section>
    </>
    // </form>
  );
}
