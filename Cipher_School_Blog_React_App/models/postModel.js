// Import mongoose module
import mongoose from "mongoose";

// Create a new schema object
const postSchema = new mongoose.Schema({
  // Define the properties of the blog post
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  userid: {
    type: mongoose.ObjectId,
    ref: "User",
  },
  photo: {
    data:Buffer,
    contentType:String
  }
},
{
  timestamps: true,
});

// Export the schema as a model
export default mongoose.model("Post", postSchema);