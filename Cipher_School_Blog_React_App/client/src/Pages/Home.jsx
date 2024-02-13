import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import axios from "axios";
import SingleBlog from "../Components/SingleBlog";

function Home() {
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        console.log('HELLO')
        const response = await axios.get("/api/v1/post/getposts");
        console.log(response.data.posts[0]);
        setPost(response.data.posts);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchBlog(); 
  }, []);

  return (
    <div className={styles.HomePage}>
      {/* <div className={styles.container}> */}
      <h1 className={styles.heading}>Top Blogs</h1>
      <div className={styles.blogs}>
        {post.map((p) => (
          <SingleBlog key={p._id} {...p} />
        ))}
      </div>
    </div>
  );
}

export default Home;