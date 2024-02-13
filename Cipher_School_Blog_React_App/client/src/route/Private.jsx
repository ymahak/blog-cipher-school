import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context/authContext.jsx";
import Spinner from "../Components/Loader.jsx";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  // eslint-disable-next-line
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      console.log("private ", auth.token);
      const res = await axios.get(`/api/v1/auth/user-auth`, {
        headers: {
          Authorization: auth?.token,
        },
      });
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
}