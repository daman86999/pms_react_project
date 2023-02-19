import React from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isPrivate }) => {
  const [cookie] = useCookies("token");
  if (isPrivate) {
    if (cookie.token) return children;
    else return <Navigate to="/login"></Navigate>;
  } else return children;
};

export default ProtectedRoute;
