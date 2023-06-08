import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthContext from "../../../context/useUsersContext";

export default function LoginAutoNavigate() {
  const { currentUser } = useAuthContext();

  return currentUser ? <Navigate to={`/Home`} /> : <Outlet />;
}
