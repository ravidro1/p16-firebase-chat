import React, { createContext } from "react";
import { useNavigate } from "react-router-dom";

export const GenericContext = createContext();

const GenericContextData = () => {
  const navigate = useNavigate();

  return { navigate };
};

export default function GenericContextProvider({ children }) {
  const value = GenericContextData();

  return (
    <GenericContext.Provider value={value}>{children}</GenericContext.Provider>
  );
}
