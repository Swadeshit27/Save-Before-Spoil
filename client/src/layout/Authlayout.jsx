import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.status);

  useEffect(() => {
    // lamding authentication=false

    if (authentication && isAuthenticated != authentication) {
      navigate("/login");
      // // landing !authentication=true && login(true)!==false
    } else if (!authentication && isAuthenticated !== authentication) {
      navigate("/dashboard-1");
    }
  }, [isAuthenticated, authentication, navigate]);
  return <div>{children}</div>;
}
