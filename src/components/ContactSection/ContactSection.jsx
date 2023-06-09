import React from "react";
import SearchContact from "./SearchContact";
import { useState } from "react";
import ContactList from "./ContactList";

export default function ContactSection() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="w-full h-full bg-orange-700">
      <section className="w-full h-[10%]">
        <SearchContact
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </section>
      <section className="w-full h-[90%]">
        <ContactList searchValue={searchValue} />
      </section>
    </div>
  );
}
