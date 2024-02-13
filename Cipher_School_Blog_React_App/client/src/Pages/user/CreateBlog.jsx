import React, { useState } from "react";
import UserMenu from "../../Components/UserMenu";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/authContext";
import axios from "axios";
import styles from "./CreateBlog.module.css"; // import the css file

function CreateBlog() {
  const [title, setTitle] = useState();
  const [photo, setPhoto] = useState();
  const [content, setContent] = useState();
  const [author, setAuthor] = useState();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("title", title);
      productData.append("Author", author);
      productData.append("content", content);
      productData.append("userId", auth?.user._id);
      productData.append("photo", photo);

      const { data } = await axios.post(`/api/v1/post/createpost`, productData);

      if (data?.success) {
        alert(data?.message);
        navigate("/dashboard/user/blogs");
      } else {
        alert(data?.message);
      }
    } catch (error) {
      console.log(error);
      // notyf.error("Something went wrong");
    }
  };

  return (
    <div className={styles.container}> 
      <div className={styles.menu}> 
        <UserMenu />
      </div>
      <div className={styles.content}> 
        <h2 className={styles.title}>CREATE BLOG</h2> 
        <div className={styles.form}>
          <div className={styles.inputGroup}> 
            <input
              type="text"
              value={title}
              placeholder="Title"
              className={styles.input} // use the input class
              onChange={(e) => setTitle(e.target.value)}
            ></input>
            <input
              type="text"
              value={author}
              placeholder="Author"
              className={styles.input} // use the input class
              onChange={(e) => setAuthor(e.target.value)}
            ></input>
          </div>
          <div className={styles.inputGroup}> 
            <label className={styles.label}> 
              {photo ? photo.name : "Upload Photo"}
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                hidden
              />
            </label>
          </div>
          <div className={styles.inputGroup}> 
            {photo && (
              <div className={styles.image}> 
                <img
                  src={URL.createObjectURL(photo)}
                  alt="product_photo"
                  className={styles.img} // use the img class
                ></img>
              </div>
            )}
          </div>
          <div className={styles.inputGroup}> 
            <textarea
              type="text"
              value={content}
              placeholder="Content"
              className={styles.textarea} // use the textarea class
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <div className={styles.inputGroup}>
            <button className={styles.button} onClick={handleCreate}> 
              Create Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateBlog;
