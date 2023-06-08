import React from "react";
import useUsersContext from "../context/useUsersContext";

export default function SettingsPage() {
  const { deleteUserFromDB, currentUser } = useUsersContext();

  return (
    <div>
      <section>
        settings
        <button
          onClick={() => deleteUserFromDB(currentUser)}
          className="bg-black p-4"
        >
          delete{" "}
        </button>
      </section>
    </div>
  );
}
