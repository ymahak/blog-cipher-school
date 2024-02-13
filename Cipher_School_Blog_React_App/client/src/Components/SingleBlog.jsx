import React, { useState, useEffect } from "react";
import styles from "./SingleBlog.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

function SingleBlog({ _id, title,author,content, userid }) {
  const [imageURL, setImageURL] = useState("");

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
    <div className={styles.singleBlog}>
      <div className={styles.imgAndDesc}>
        {imageURL ? (
          <img src={imageURL} alt={title} className={styles.image} />
        ) : (
          <p>Loading image...</p>
        )}
        <div className={styles.headAndDesc}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.author}>{author}</p>
        </div>
      </div>
      <div className={styles.contentandreadmore}>
        <div className={styles.contentPreview}>
          {content.length > 100 ? `${content.substring(0, 100)}...` : content}
        </div>
        <Link to={`/blog/${_id}`} className={styles.readMore}>Read more...</Link>
      </div>
    </div>
  );
}

export default SingleBlog;
