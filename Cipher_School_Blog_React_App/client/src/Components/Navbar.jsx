import React from 'react'
import { Link,NavLink } from 'react-router-dom'
import styles from "./Navbar.module.css";
import { useAuth } from '../Context/authContext';

function Navbar() {
  const {auth,setAuth}=useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    // toast.success("Logout Sucessfully");
  };
  return (
    <div className={styles.main}>  
     <Link to="/" ><p className={styles.logo} >MyBlog</p> </Link>
     <nav className={styles.loginregister}>
     {!auth.user ? (
              <ul className={styles.loginregister1}>
                <li >
                  <Link  to="/register">
                    Register
                  </Link>
                </li>
                <li >
                  <Link  to="/login">
                    login
                  </Link>
                </li>
              </ul>
            ) : (
              <>
                <li className={styles.dashboard}>
                  <NavLink
                  exact={true.toString()}
                  to="/dashboard/user"
                  activeclassname="active"
                  className={styles.navlinks}
                >
                  Dashboard
                  </NavLink>
                <NavLink
                  onClick={handleLogout}
                  to="/login"
                  className={styles.navlinks}
                >
                        logout
                </NavLink>
                </li>
              </>
            )}
     </nav>
    </div>
  )
}

export default Navbar
