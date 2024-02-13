import axios from "axios";
import { useContext, useEffect, useState, createContext } from "react";

const Authcontext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  axios.defaults.headers.common["Authorization"] = auth?.token;

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parsedata = JSON.parse(data);
      setAuth({
        ...auth,
        user: parsedata.user,
        token: parsedata.token,
      });
    }
  }, []);

  return (
    <Authcontext.Provider value={{ auth, setAuth }}>
      <>{children}</>
    </Authcontext.Provider>
  );
};

const useAuth = () => useContext(Authcontext);

export { useAuth, AuthProvider };