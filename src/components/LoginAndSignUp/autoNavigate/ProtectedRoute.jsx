import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthContext from "../../../context/useUsersContext";

export default function ProtectedRoute() {
  const { currentUser } = useAuthContext();

  return currentUser ? <Outlet /> : <Navigate to={"/"} />;
}
