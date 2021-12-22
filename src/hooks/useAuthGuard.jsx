import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { setTokens } from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";

const useAuthGuard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const params = new URLSearchParams(window.location.search);
  // console.log(params.get("accessToken"));
  // console.log(params);

  useEffect(() => {
    const accessToken =
      localStorage.getItem("TOKENS") || params.get("accessToken"); // "TOKENS" are set when the user logs in
    const refreshToken = params.get("refreshToken"); // "TOKENS" are set when the user logs in

    if (!accessToken) {
      navigate("/login");
    } else if (params.get("accessToken")) {
      let accessToken = params.get("accessToken");

      dispatch(setTokens({ accessToken, refreshToken })); // adding tokens to the redux store

      localStorage.setItem(
        "TOKENS",
        JSON.stringify({ accessToken, refreshToken })
      );
      navigate("/");
    }
  }, []);
};
export default useAuthGuard;
