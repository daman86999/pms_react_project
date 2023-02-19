import React from "react";
import { useCookies } from "react-cookie";
import { Redirect, Route } from "react-router-dom";

const AppRoute = ({ children, isPrivate }) => {
  const [cookie] = useCookies("token");
  console.log("c", cookie);
  return children;
  //   isPrivate && !cookie.token ? (
  //     <Redirect to={{ pathname: "/signin" }} />
  //   ) : (
  //     children
  //   );
};

export default AppRoute;
