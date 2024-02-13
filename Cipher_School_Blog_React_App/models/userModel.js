import mongoose from 'mongoose';

const userModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  username: {
    type: String,
    required: true,
    unique: true},

  password: {
    type: String,
     required: true},
},
{
  timestamps: true,
});

export default mongoose.model("Users",userModel);