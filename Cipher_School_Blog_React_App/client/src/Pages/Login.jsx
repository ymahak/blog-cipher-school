import React, { useState } from "react";
import { Link, useNavigate, useLocation, NavLink } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context/authContext.jsx";
import loginstyle from "./Login.module.css";

function Login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/v1/auth/login`, { username, password });
      if (res && res.data && res.data.success) {
        alert(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/dashboard/user");
      } else {
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={loginstyle.main}>
      <div className={loginstyle.login}>
        <form>
          <h1>Login</h1>
          <input
            type="text"
            required
            value={username}
            onChange={(e) => setusername(e.target.value)}
          />
          <input
            type="Password"
            required
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <input
            className={loginstyle.button_common}
            type="submit"
            value="Login"
            onClick={handlesubmit}
          ></input>
        </form>
        <NavLink to="/register">Not yet registered? Register Now</NavLink>
        <br />
      </div>
    </div>
  );
}

export default Login;