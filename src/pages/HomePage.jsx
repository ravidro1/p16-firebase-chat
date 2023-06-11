import React, { useState } from "react";
import ContactSection from "../components/ContactSection/ContactSection";
import ChatRoom from "../components/ChatSection/ChatRoom";
import Settings from "../components/settings/Settings";
import useChatContext from "../context/useChatContext";

export default function HomePage() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);
  const { selectedRoomId } = useChatContext();

  return (
    <div className="w-[100%] h-[100%] flex flex-col justify-center items-center ">
      <div className="lg:w-[80%] w-[100%] lg:h-[85%] h-[100%] shadow-2xl flex overflow-hidden">
        {isSettingsOpen ? (
          <Settings setIsSettingsOpen={setIsSettingsOpen} />
        ) : (
          <>
            <section
              className={
                "h-full md:w-[40%] w-[100%] md:block " +
                (selectedRoomId && "hidden")
              }
            >
              <ContactSection
                setIsSettingsOpen={setIsSettingsOpen}
                setChatLoading={setChatLoading}
              />
            </section>
            <section
              className={
                "h-full md:w-[60%] w-[100%] md:block " +
                (!selectedRoomId && "hidden")
              }
            >
              <ChatRoom
                setIsSettingsOpen={setIsSettingsOpen}
                chatLoading={chatLoading}
              />
            </section>
          </>
        )}{" "}
      </div>
    </div>
  );
}
