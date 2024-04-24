import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { dataBase } from "../../firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";

function ForgotMyPassword({
  setEmailSentDisplay,
  setIsForgotMyPasswordClicked,
}) {
  const [emailInput, setEmailInput] = useState("");

  const sendPasswordEmail = async (e) => {
    try {
      e.preventDefault();

      // console.log("click");
      const lowerEmailInput = emailInput.toLowerCase();

      const res = query(
        collection(dataBase, "users"),
        where("email", "==", lowerEmailInput)
      );

      const querySnapshot = await getDocs(res);

      let user = null;

      querySnapshot.forEach((doc) => {
        user = doc.data();
      });

      // console.log(user);

      if (user) {
        await emailjs.send(
          import.meta.env.VITE_EMAIL_JS_SERVICE_ID,
          import.meta.env.VITE_EMAIL_JS_TEMPLATE_ID,
          {
            subject: "Forgot Password",
            message: "Your Password Is: " + user.password,
            toEmail: lowerEmailInput,
          },
          import.meta.env.VITE_EMAIL_JS_PUBLIC_KEY
        );

        setEmailSentDisplay({
          text: "Your Password Have Been Sent To Your Email",
          status: "success",
        });
      } else {
        setEmailSentDisplay({
          text: "Error Sending Password To Your Email. Try Again Later",
          status: "error",
        });
      }
    } catch (error) {
      setEmailSentDisplay({
        text: "Server Error",
        status: "error",
      });
    } finally {
      setIsForgotMyPasswordClicked(false);
    }
  };

  return (
    <div className="flex w-[75%] flex-col items-center justify-center">
      <p>Get Your Credentials To Your Email</p>
      <form
        className="flex w-[100%] flex-col  items-center justify-center"
        // onSubmit={sendPasswordEmail}
      >
        <input
          className="m-1 h-[50px] w-[90%] p-3"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          placeholder="Email"
          type={"text"}
        />
        <button
          onClick={sendPasswordEmail}
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
