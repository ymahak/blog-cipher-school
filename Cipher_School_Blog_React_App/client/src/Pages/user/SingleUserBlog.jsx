import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./SingleUserBlog.module.css";

function SingleUserBlog({
  _id,
  title,
  author,
  content,
  userid,
}) {
  const [imageURL, setImageURL] = useState("");

  // console.log("inside single blog");

  useEffect(() => {
    const fetchImageURL = async () => {
      try {
        const response = await axios.get(`/api/v1/post/getblogphoto/${_id}`, {
          responseType: "arraybuffer",
        });
        const imageBlob = new Blob([response.data], { type: "image/jpeg" });
        const imageUrl = URL.createObjectURL(imageBlob);
        setImageURL(imageUrl);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchImageURL();
  }, [_id]);
  return (
    <div className={styles.col}>
      <div className={styles.card}>
        <img src={imageURL} className={styles.cardImg} alt="Blog Image" />
        <div className={styles.cardBody}>
          <h5 className={styles.cardTitle}>{title}</h5>
          <p className={styles.cardText}>{author}</p>
          <div className={styles.buttonGroup}>
            <Link to={`/blog/${_id}`} className={styles.button}>
              Read More
            </Link>
            <Link to={`update-blog/${_id}`} className={styles.button}>
              Edit Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleUserBlog;
