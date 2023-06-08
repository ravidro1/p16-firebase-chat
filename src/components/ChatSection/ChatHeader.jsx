import { useState } from "react";
import threeDots from "/assets/three-dots.svg";
import useUsersContext from "../../context/useUsersContext";
import useGenericContext from "../../context/useGenericContext";
import { doc, getDoc } from "firebase/firestore";
import { dataBase } from "../../firebase/FirebaseConfig";
import { useEffect } from "react";

export default function Header({ otherUserData }) {
  const { logoutAuth, currentUser } = useUsersContext();
  const { navigate } = useGenericContext();

  const [isNavBarOpen, setIsNavBarOpen] = useState(false);

  return (
    <div className="w-full h-[10%] bg-black flex justify-between relative ">
      <section className="h-full p-2 flex">
        {otherUserData && (
          <>
            <img
              className="h-full aspect-square rounded-full"
              src={otherUserData?.profilePic}
              alt=""
            />
            <h1 className="text-white ml-6 text-center flex items-center text-2xl">
              {otherUserData?.nickName}
            </h1>
          </>
        )}
      </section>

      <button
        onClick={() => setIsNavBarOpen(!isNavBarOpen)}
        className="h-full aspect-square p-4"
      >
        <img className="w-full h-full" src={threeDots} alt="" />
      </button>

      <div
        style={{
          height: isNavBarOpen ? "150px" : "0",
          transition: "height 0.1s",
        }}
        className="flex flex-col absolute right-0 bottom-0 translate-y-[100%] bg-slate-900 w-[200px] z-10 rounded-bl-lg overflow-hidden"
      >
        {" "}
        <button
          onClick={() => navigate("/Settings")}
          className=" p-4 border-b border-white hover:bg-slate-500 w-full h-[50%]"
        >
          settings{" "}
        </button>
        <button
          onClick={() => logoutAuth()}
          className=" p-4 border-b border-white hover:bg-slate-500  w-full h-[50%]"
        >
          logout{" "}
        </button>
      </div>
    </div>
  );
}

{
  /* <button onClick={() => navigate("/Home")} className="bg-black p-4">
Home{" "}
</button> */
}
