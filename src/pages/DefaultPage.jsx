import React from "react";
import { useNavigate } from "react-router-dom";

function DefaultPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex justify-around items-center text-white flex-col">
      <p className="text-5xl text">
        <strong> 404 </strong>&nbsp;Page Not Found
      </p>
      <button
        className="p-3 bg-[#1C2B2D] text-2xl"
        onClick={() => navigate("/")}
      >
        {" "}
        Go Back To Login Page
      </button>
    </div>
  );
}

export default DefaultPage;
