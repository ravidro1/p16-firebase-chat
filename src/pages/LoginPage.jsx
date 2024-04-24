import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUsersContext from "../context/useUsersContext";
import ForgotMyPassword from "../components/LoginAndSignUp/ForgotMyPassword";

function LoginPage() {
  const navigate = useNavigate();

  const { loginAuth } = useUsersContext();

  const [isWrongCredentials, setIsWrongCredentials] = useState(false);
  const [isForgotMyPasswordClicked, setIsForgotMyPasswordClicked] =
    useState(false);

  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const login = async (event) => {
    event.preventDefault();

    try {
      const user = await loginAuth(emailValue, passwordValue);

      setIsWrongCredentials(false);

      setEmailValue("");
      setPasswordValue("");

      navigate(`/Home`);
    } catch (error) {
      // console.error(error);
      setIsWrongCredentials(true);
    }
  };

  const [emailSentDisplay, setEmailSentDisplay] = useState(null);

  return (
    <div className="flex h-full w-full flex-col items-center justify-around">
      <h1 className="hidden md:block text-center text-6xl text-white  md:text-8xl">
        CHAT
      </h1>

      <div className="flex sm:h-[85%] md:h-[75%] flex-col items-center justify-around overflow-hidden sm:rounded-lg bg-[#9BA4B5] shadow-2xl h-full sm:w-[70%] lg:w-[40%] w-full">
        <h1 className="sm:block m-2 text-center text-5xl sm:text-6xl text-white">
          LOGIN{" "}
        </h1>{" "}
        <section className="flex w-full flex-col items-center">
          {" "}
          <form
            onChange={() => setIsWrongCredentials(false)}
            // onSubmit={login}
            className="flex w-[90%] flex-col items-center rounded-lg border-2 sm:w-[75%]"
          >
            {isWrongCredentials && (
              <p className="m-2 text-red-600">
                <strong> Username or Password Wrong </strong>
              </p>
            )}

            <input
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              name="email"
              placeholder="Email"
              type="email"
              className="m-3 h-[50px] w-[90%] p-3"
              required
              pattern={"^[A-Za-z][A-za-z0-9]*@[A-Za-z]+.[A-Za-z]{2,}"}
            />

            <input
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
              required
              name="password"
              placeholder="Password"
              type="password"
              className="m-3 h-[50px] w-[90%]  p-3"
            />

            <button
              onClick={login}
              // type="submit"
              className="m-6 w-[80%] bg-[#1C2B2D] px-4 py-2 text-2xl text-white hover:bg-[#1C2B2Dcc]"
            >
              Login
            </button>
          </form>
          <button
            className="m-2 text-[#002B5B] hover:text-[#655DBB] hover:underline"
            onClick={() =>
              setIsForgotMyPasswordClicked(!isForgotMyPasswordClicked)
            }
          >
            {" "}
            Forgot your username or password?{" "}
          </button>
          {isForgotMyPasswordClicked && (
            <ForgotMyPassword
              setIsForgotMyPasswordClicked={setIsForgotMyPasswordClicked}
              setEmailSentDisplay={setEmailSentDisplay}
            />
          )}
          <h2
            style={{
              color: emailSentDisplay?.status == "success" ? "green" : "red",
            }}
          >
            {emailSentDisplay?.text}
          </h2>
        </section>
        <button
          className="w-fit text-lg text-[#002B5B] hover:text-[#655DBB] hover:underline"
          onClick={() => navigate("SignUp")}
        >
          GO TO SIGN UP
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
