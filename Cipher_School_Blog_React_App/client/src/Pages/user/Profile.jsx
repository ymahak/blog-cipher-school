import React, { useEffect, useState } from "react";
import UserMenu from "../../Components/UserMenu";
import { useAuth } from "../../Context/authContext";
import axios from "axios";
import styles from "./Profile.module.css"; // import the css file

function Profile() {
  const { auth, setAuth } = useAuth();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const { username , name, password } = auth?.user;
    setName(name);
    setUsername(username);
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/auth/profile`,
        { name, username, password }
        // answer was removed in thee video
      );

      if (data?.error) {
        console.log(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        console.log("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={styles.container}> 
        <div className={styles.menu}> 
          <UserMenu />
        </div>
        <div className={styles.content}> 
          <div className={styles.formContainer}> 
            <form onSubmit={handleSubmit} className={styles.form}>
              <h4 className={styles.title}>USER PROFILE</h4> 
              <div className={styles.inputGroup}> 
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={styles.input} // use the input class
                  id="exampleInputEmail1"
                  placeholder="Enter Your Name"
                  autoFocus
                />
              </div>
              <div className={styles.inputGroup}> 
                <input
                  type="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={styles.input} // use the input class
                  id="exampleInputEmail1"
                  placeholder="Enter Your Email "
                  disabled
                />
              </div>
              <div className={styles.inputGroup}>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input} // use the input class
                  id="exampleInputPassword1"
                  placeholder="Enter Your Password"
                />
              </div>
              <button type="submit" className={styles.button}>
                UPDATE
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
