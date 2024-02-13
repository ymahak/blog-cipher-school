import postModel from "../models/postModel.js";


export const getPosts = async (req, res) => {
  try {
    const posts = await postModel
    .find({})
    .select("-photo")
    .limit(12)
    .sort({ createdAt: -1 });
    res.status(200).send({
      success:true,
      message:"All posts fetched successfully",
      counTotal: posts.length,
      posts,
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      message: "Erorr in getting blog",
      error: error.message,
    });
  }
};

export const getBlogPhoto = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await postModel.findById({ _id: id }).select("photo");
    if (!post) {
      return res.status(404).send({
        success: false,
        message: "post not found",
      });
    }
    if (!post.photo || !post.photo.data) {
      return res.status(404).send({
        success: false,
        message: "Photo not found for this post",
      });
    }
    if (post.photo.data) {
      res.set("Content-type", post.photo.contentType);
      return res.status(200).send(post.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};


export const getSinglePost = async (req, res) => {
  try {
    const id = req.params.id; 
    const post = await postModel.find({ _id: id }).select("-photo");
    res.status(200).send({
      success:true,
      message:"Post fetched successfully",
      data:{
        post:post
      }
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      message: "Erorr in getting post",
      error: error.message,
    });
  }
};


export const getUserBlogs = async (req, res) => {
  try {
    const userid = req.params.id; 
    const userpost = await postModel
      .find({ userid })
      .select("-photo")
      .sort({ createdAt: -1 }); 

    if (!userpost) {
      return res.status(404).send({
        success: false,
        message: "No post found for this user.",
      });
    }

    return res.status(200).send({
      success: true,
      message: "User posts retrieved successfully.",
      userpost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while retrieving user posts.",
      error,
    });
  }
};


export const createPost = async (req, res) => {
  try {
  const { title, author, content, userid} = req.body;
  const photo = req.files ? req.files.photo : null;
  const newFields = { title, author,content, userid};

  if(photo){
    newFields.photo={
      data:photo.data,
      contentType:photo.mimetype,
    }
  }
  const newblogcreated = new postModel(newFields);

    await newblogcreated.save();
    res.status(201).send({
      success:true,
      message:"Post created  successfully!",
      data: newblogcreated,
    });
  } catch (error) {
    console.log(error);
    res.status(409).send({
      success: false,
      message: "Error while Creating Blog",
      error,
    });

  }
};

export const updatePost = async (req, res) => {
  try {
    const id = req.params.id; 
    const { title, content} = req.body;
    const photo = req.files ? req.files.photo : null;
    const updateFields = { title, content };

    if (photo) {
      updateFields.photo = {
        data: photo.data,
        contentType: photo.mimetype,
      };
    }

    const updatedBlog = await postModel.findByIdAndUpdate(
      id,
      updateFields,
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found.",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Blog content updated successfully.",
      updatedBlog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating blog content.",
      error,
    });
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id; 
  try {
    const deletedPost = await postModel.findByIdAndDelete(id);
    res.status(200).send({
      success:true,
      message:"Post deleted successfully"+deletedPost,
    });
  } catch (error) {
    res.status(409).send({
      success:false,
      message:"Failed to delete the post."+ error.message,
    });
  }
};