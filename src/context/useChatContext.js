import React from "react";
import { useContext } from "react";
import { ChatContext } from "./ChatContextProvider";

export default function useGenericContext() {
  return useContext(ChatContext);
}
