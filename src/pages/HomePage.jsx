import React, { useState } from "react";
import ContactSection from "../components/ContactSection/ContactSection";
import ChatRoom from "../components/ChatSection/ChatRoom";
import Settings from "../components/settings/Settings";

export default function HomePage() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);

  // console.log(chatLoading);
  return (
    <div className="w-[100%] h-[100%] flex flex-col justify-center items-center ">
      <div className="bg-[#E6D5B8] md:w-[80%] w-[95%] xl:h-[80%] h-[95%] shadow-2xl flex overflow-hidden">
        {isSettingsOpen ? (
          <Settings setIsSettingsOpen={setIsSettingsOpen} />
        ) : (
          <>
            <section className="h-full w-[40%]">
              <ContactSection
                setIsSettingsOpen={setIsSettingsOpen}
                setChatLoading={setChatLoading}
              />
            </section>
            <section className="h-full w-[60%]">
              <ChatRoom setIsSettingsOpen={setIsSettingsOpen} />
            </section>
          </>
        )}{" "}
      </div>
    </div>
  );
}
