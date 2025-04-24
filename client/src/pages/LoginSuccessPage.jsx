import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticateUser } from "../redux/slices/authSlice";
import { Navigate } from "react-router-dom";

const LoginSuccessPage = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authenticateUser());
  });

  if (!isAuthenticated) return <>Loading..</>;

  return <Navigate to={"/products"} />;
};

export default LoginSuccessPage;
