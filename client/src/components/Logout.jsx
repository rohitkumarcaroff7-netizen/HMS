import "./logout.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useAuth } from "../store/auth";

export const Logout = () => {
  const { LogoutUser } = useAuth();
  const navigate = useNavigate();
  const didRun = useRef(false);

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;
    LogoutUser();
    alert("Logout successful");
    navigate("/login");
  }, [LogoutUser, navigate]);

  return null;
};
