import React, { useEffect, useState } from "react";
import UserMenu from "../../Components/UserMenu";
import axios from "axios";
import { useAuth } from "../../Context/authContext";
import { Link } from "react-router-dom";
import SingleUserBlog from "./SingleUserBlog";

function Blogs() {
  const [post, setPost] = useState([]);
  const { auth } = useAuth();
  // console.log(auth);

  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `/api/v1/post/getuserblog/${auth?.user.id}`
        );
        console.log(response.data.userpost);
        setPost(response.data.userpost);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchBlog(); // Call fetchBlog after defining it
  }, []);


  //   useEffect(() => {
  //   const fetchImageURL = async () => {
  //     try {
  //       const response = await axios.get(
  //         `/api/v1/post/getblogphoto/${auth?.user._id}`,
  //         {
  //           responseType: "arraybuffer",
  //         }
  //       );
  //       const imageBlob = new Blob([response.data], { type: "image/jpeg" });
  //       const imageUrl = URL.createObjectURL(imageBlob);
  //       setImageURL(imageUrl);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };

  //   fetchImageURL();
  // }, []);
 

  const handleDelete = (deletedBlogId) => {
    // Update state to remove the deleted blog
    setPost((prevBlogs) =>
      prevBlogs.filter((post) => post._id !== deletedBlogId)
    );
  };

  return (
    <div className="d-flex " style={{ gap: "2rem" }}>
      <div className="col-md-3">
        <UserMenu />
      </div>
      <div className="container">
        <h1 className="display-5 text-center mb-4">MY BLOGS</h1>
        <div className="row">
          {post.map((p) => (
            <SingleUserBlog key={p._id} {...p} handleDelete={handleDelete} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blogs;