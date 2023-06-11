import React, { useState } from "react";
import ContactList from "./ContactList";
import ProfileShow from "./ProfileShow";

export default function ContactSection({ setIsSettingsOpen, setChatLoading }) {
  const [searchValue, setSearchValue] = useState("");
  console.log(searchValue);
  return (
    <div className="w-full h-full bg-[#9BA4B5]">
      <section className="w-full h-[10%] bg-[#526D82]">
        <ProfileShow setIsSettingsOpen={setIsSettingsOpen} />
      </section>
      <section className="w-full h-[10%] flex justify-center bg-[#7B8FA1]">
        <input
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
          className="w-[90%] h-[100%] p-3 bg-transparent text-white placeholder:text-[#ffffffbf]"
          placeholder="Search..."
          type="text"
        />
      </section>
      <section className="w-full h-[85%]">
        <ContactList
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          setChatLoading={setChatLoading}
        />
      </section>
    </div>
  );
}
