import React from "react";
import { useContext } from "react";
import { UsersContext } from "./UsersContextProvider";

export default function useUsersContext() {
  return useContext(UsersContext);
}
