import useChatContext from "../../context/useChatContext";
import goBackArrow from "/assets/go-back-arrow.svg";

export default function ChatHeader({ otherUserData }) {
  const { setSelectedRoomId } = useChatContext();
  // go-back-arrow
  return (
    <div className="w-full h-full flex justify-start relative items-center ">
      <section className={"h-full aspect-square md:hidden block p-2 "}>
        <button
          style={{ transition: "background 0.2s" }}
          className="hover:bg-[#0000002c] rounded-full p-3"
          onClick={() => setSelectedRoomId(null)}
        >
          <img
            className="w-full h-full bg-slate-500 rounded-xl p-2"
            src={goBackArrow}
            alt=""
          />
        </button>
      </section>
      <img
        className="h-full aspect-square rounded-full p-3"
        src={otherUserData?.profilePic}
        alt=""
      />
      <h1 className="text-white w-[45%] text-2xl overflow-hidden overflow-ellipsis whitespace-nowrap text-start px-4">
        {otherUserData?.nickName}
      </h1>
    </div>
  );
}
