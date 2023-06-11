import React, { useState } from "react";
import useUsersContext from "../../context/useUsersContext";
// import emailjs from "@emailjs/browser";

function ForgotMyPassword({
  setEmailSentDisplay,
  setIsForgotMyPasswordClicked,
}) {
  const [emailInput, setEmailInput] = useState("");

  const { allUsersData } = useUsersContext();

  const sendPasswordEmail = (e) => {
    e.preventDefault();

    // allUsersData.forEach((user) => {
    //   const lowerEmailInput = emailInput.toLowerCase();
    //   const lowerUserEmail = user.email.toLowerCase();

    //   if (lowerEmailInput === lowerUserEmail) {
    //     const forgottenUser = {
    //       firstName: user.firstName,
    //       lastName: user.lastName,
    //       username: user.username,
    //       password: user.password,
    //       email: user.email,
    //     };
    //     emailjs
    //       .send(
    //         "service_phncgki",
    //         "template_pki2s0s",
    //         forgottenUser,
    //         "G6FfxIuzzIWh-iY_u"
    //       )
    //       .then(
    //         (result) => {
    //           console.log(
    //             "Your username and password have been sent to your email."
    //           );
    //           setEmailSentDisplay(
    //             "Your username and password have been sent to your email."
    //           );
    //         },
    //         (error) => {
    //           console.log(error.text);
    //           setEmailSentDisplay(
    //             "Error sending username and password to your email. Try again later."
    //           );
    //         }
    //       );
    //   } else {
    //     // setEmailSentDisplay("Entered email did not match any user's saved email.")
    //   }
    // });
    // setIsForgotMyPasswordClicked(false);
  };

  return (
    <div className="flex w-[75%] flex-col items-center justify-center">
      <p>Get Your Credentials To Your Email</p>
      <form
        className="flex w-[100%] flex-col  items-center justify-center"
        onSubmit={sendPasswordEmail}
      >
        <input
          className="m-1 h-[50px] w-[90%] p-3"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          placeholder="Email"
          type={"text"}
        />
        <button
          className="m-1 h-[50px] w-[90%] bg-[#1C2B2D] px-4 py-2 text-2xl text-white hover:bg-[#1c2b2dcc]"
          type="submit"
        >
          SEND
        </button>
      </form>
    </div>
  );
}

export default ForgotMyPassword;
