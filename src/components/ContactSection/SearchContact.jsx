import React from "react";

export default function SearchContact({ searchValue, setSearchValue }) {
  return (
    <div className="w-full h-full bg-pink-800 flex justify-center items-center">
      <input
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
        className="w-[80%] h-[90%] p-3"
        placeholder="Search..."
        type="text"
      />
    </div>
  );
}
