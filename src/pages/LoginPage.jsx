import React from "react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import ForgotMyPassword from "../Components/LoginAndSignUp/ForgotMyPassword";
import useUsersContext from "../context/useUsersContext";

function LoginPage() {
  const navigate = useNavigate();
  
  const {loginAuth} = useUsersContext();

  const [isWrongCredentials, setIsWrongCredentials] = useState(false);
  const [isForgotMyPasswordClicked, setIsForgotMyPasswordClicked] =
    useState(false);

  const login = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const user = await loginAuth(email, password);

      setIsWrongCredentials(false);

      event.target.email.value = "";
      event.target.password.value = "";

      navigate(`/Home/${user.firstName}`);
    } catch (error) {
      console.error(error);
      setIsWrongCredentials(true);
    }
  };

  const [emailSentDisplay, setEmailSentDisplay] = useState("");

  return (
    <div className="flex h-full w-full flex-col items-center justify-around">
      <h1 className="text-center text-4xl text-white md:text-5xl lg:text-7xl">
        CHAT
      </h1>
      <h2 className="text-center text-2xl text-white "> LOGIN </h2>

      <div className="flex h-[65%] w-[85%] flex-col items-center justify-evenly overflow-hidden rounded-lg bg-[#E6D5B8] shadow-2xl sm:w-[70%] md:w-[55%] lg:w-[35%]">
        <section className="flex w-full flex-col items-center">
          <form
            onChange={() => setIsWrongCredentials(false)}
            onSubmit={login}
            className="flex w-[90%] flex-col items-center rounded-lg border-2 sm:w-[75%]"
          >
            {isWrongCredentials && (
              <p className="m-2 text-red-600">
                <strong> Username or Password Wrong </strong>
              </p>
            )}

            <input
              name="email"
              placeholder="Email"
              type="email"
              className="m-3 h-[50px] w-[90%] p-3"
              required
            />

            <input
              required
              name="password"
              placeholder="Password"
              type="password"
              className="m-3 h-[50px] w-[90%]  p-3"
            />

            <button
              type="submit"
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
          <h2>{emailSentDisplay}</h2>
        </section>

        <button
          className=" w-[40%] text-lg text-[#002B5B] hover:text-[#655DBB] hover:underline"
          onClick={() => navigate("SignUp")}
        >
          Go To Sign-Up
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
