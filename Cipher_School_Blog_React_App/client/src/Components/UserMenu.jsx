import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./UserMenu.module.css";

const UserMenu = () => {
  return (
    <div className={styles.container}>
      <div className={styles.listGroup}>
        <h1 className={styles.title}>User Panel</h1>
        <br />
        <NavLink
          to="/dashboard/user/profile"
          className={styles.listItem}
        >
          Profile
        </NavLink>
        <NavLink
          to="/dashboard/user/blogs"
          className={styles.listItem}
        >
          Blogs
        </NavLink>
        <NavLink
          to="/dashboard/user/create-blog"
          className={styles.listItem}
        >
          Create New Blog
        </NavLink>
      </div>
    </div>
  );
};

export default UserMenu;
