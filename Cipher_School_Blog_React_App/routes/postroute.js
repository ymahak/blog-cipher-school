import express  from "express";
import { getPosts,getSinglePost,createPost,updatePost,deletePost,getBlogPhoto,getUserBlogs } from "../controllers/postController.js";
import fileUpload from "express-fileupload";
import { requireSignIn } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/createpost", requireSignIn, fileUpload(), createPost);
router.get("/getposts", getPosts);
router.get("/getblogphoto/:id", getBlogPhoto);
router.get("/getsinglepost/:id", getSinglePost);
router.get("/getuserblog/:id", requireSignIn, getUserBlogs);
router.patch("/updatepost/:id", requireSignIn, fileUpload(), updatePost);
router.delete("/deletepost/:id", deletePost);

export default router;