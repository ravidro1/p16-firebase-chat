import React from "react";
import useUsersContext from "../context/useUsersContext";
import ContactSection from "../components/ContactSection/ContactSection";
import ChatRoom from "../components/ChatSection/ChatRoom";
import { useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { dataBase } from "../Firebase/FirebaseConfig";
import { useEffect } from "react";
import Settings from "../components/settings/Settings";

export default function HomePage() {
  const [selectedRoomID, setSelectedRoomID] = useState(null);

  const [allChatsData, setAllChatsData] = useState([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(collection(dataBase, "chatRoom"), (snapshot) => {
      const tempAllChatsData = [];
      snapshot.docs.forEach((doc) => {
        tempAllChatsData.push({ ...doc.data(), id: doc.id });
        setAllChatsData(tempAllChatsData);
      });
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <div className="w-[100%] h-[100%] flex flex-col justify-center items-center ">
      <div className="bg-[#E6D5B8] w-[80%] h-[80%] rounded-lg shadow-2xl flex overflow-hidden">
        {isSettingsOpen ? (
          <Settings setIsSettingsOpen={setIsSettingsOpen} />
        ) : (
          <>
            <section className="h-full w-[40%]">
              <ContactSection
                allChatsData={allChatsData}
                setSelectedRoomID={setSelectedRoomID}
              />
            </section>
            <section className="h-full w-[60%]">
              <ChatRoom
                setIsSettingsOpen={setIsSettingsOpen}
                allChatsData={allChatsData}
                selectedRoomID={selectedRoomID}
              />
            </section>
          </>
        )}{" "}
      </div>
    </div>
  );
}
