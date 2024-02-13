import React, { useEffect, useState } from "react";
import UserMenu from "../../Components/UserMenu";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../Context/authContext";
import axios from "axios";

function UpdateBlog() {

    const [title, setTitle] = useState();
    const [photo, setPhoto] = useState();
    const [content, setContent] = useState();
    const navigate = useNavigate();
    const { auth } = useAuth();

    const { id } = useParams();

    useEffect(() => {
      const fetchBlogdata = async () => {
        try {
          const response = await axios.get(`/api/v1/post/getblogphoto/${id}`, {
            responseType: "arraybuffer",
          });
          
        } catch (error) {
          console.log(error.message);
        }
      };

      fetchBlogdata();
    }, [id]);

  
  return (
    <div className="d-flex " style={{ gap: "2rem" }}>
      <div className="col-md-3">
        <UserMenu />
      </div>
      <div className="col-md-8 pt-2 px-5" style={{ fontSize: "25px" }}>
        <h1 className="d-flex justify-content-center mb-5">Update Blog</h1>
        <div style={{ width: "80%", marginLeft: "60px" }}>
          <div className="mb-3">
            <input
              type="text"
              value={title}
              placeholder="Title"
              className="form-control"
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </div>
          <div className="mb-3">
            <label className="btn btn-outline-secondary col-md-12">
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
          <div className="mb-3">
            {photo && (
              <div className="text-center">
                <img
                  src={URL.createObjectURL(photo)}
                  alt="product_photo"
                  height={"200px"}
                  className="img img-responsive"
                ></img>
              </div>
            )}
          </div>
          <div className="mb-3">
            <textarea
              type="text"
              value={content}
              placeholder="Content"
              className="form-control"
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-3">
            <button className="btn btn-primary">Create Product</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateBlog;