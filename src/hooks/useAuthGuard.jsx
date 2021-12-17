import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const useAuthGuard = () => {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  console.log(params.get("accessToken"));
  console.log(params);

  useEffect(() => {
    const accessToken =
      localStorage.getItem("TOKENS") || params.get("accessToken"); // "TOKENS" are set when the user logs in

    if (!accessToken) {
      navigate("/login");
    } else if (params.get("accessToken")) {
      localStorage.setItem("ACCESS_TOKEN", accessToken);
      navigate("/");
    }
  }, []);
};
export default useAuthGuard;
