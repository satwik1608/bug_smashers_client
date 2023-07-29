import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../userContext";

function RequireAuth({ children }) {
  const { id: user, setId } = useUser();
  console.log(user);
  return user ? children : <Navigate to={`/`} replace />;
}

export default RequireAuth;
