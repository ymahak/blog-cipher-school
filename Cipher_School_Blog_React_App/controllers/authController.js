import userModel from "../models/userModel.js";
import Jwt from "jsonwebtoken";
import { comparePassword,hashedPassword } from "../Helper/authHelper.js";

export const RegisterController = async (req, res) => {

    try {
      const {
        name,
        username,
        password,
      } = req.body;
  // console.log("i am here in try")
      if (!name) {

        return res.send({ message: "Name is Required" });
      }
      
      if (!username) {
        return res.send({ message: "Username is Required" });
      }
      if (!password) {
        return res.send({ message: "Password is Required" });
      }
      // console.log("data fetched")
  
      const ExistingUser = await userModel.findOne({ username });
      if (ExistingUser) {
        return res.status(201).send({
          success: false,
          message: "User Already Exists",
        });
      }

      const hashPassword = await hashedPassword(password);

    const user = await new userModel({
        name,
        username,
        password:hashPassword,
      }).save();
      return res.status(200).send({
        success: true,
        message: "User Registered Successfully",
        user,
      });
    } catch (error) {
        return res.status(400).send({
          success: false,
          message: "Error in Registration",
          error,
        });
      }
    };



    export const LoginController = async (req, res) => {
        try {
          const { username, password } = req.body;
      
          if (!username || !password) {
            return res.status(404).send({
              success: false,
              message: "Invalid Email or Password",
            });
          }
      
          const user = await userModel.findOne({ username });
          if (!user) {
            return res.status(404).send({
              success: false,
              message: "Email is not registerd",
            });
          }

          const match = await comparePassword(password, user.password);
          
          if (!match) {
            // console.log("below match")
            return res.status(200).send({
              success: false,
              message: "Invalid Password",
            });
          }
          // console.log("hello")
          const token = await Jwt.sign({ _id: user._id }, process.env.JWT_SECRETKEY, {
            expiresIn: "7d",
          });
          res.status(200).send({
            success: true,
            message: "login successfully",
            user: {
              id: user.id,
              name: user.name,
              username: user.username,
            },
            token,
          });
        } catch (error) {
          console.log(error);
          res.status(500).send({
            success: false,
            message: "Error in login",
            error,
          });
        }
      };

      export const forgotPasswordController = async (req, res) => {
        try {
          const { username, newPassword } = req.body;
          if (!username) {
            return res.status(400).send({ message: "Email is required" });
          }
          const user = await userModel.findOne({ username });
          if (!user) {
            return res.status(404).send({
              success: false,
              message: "Enter correct email",
            });
          }
      // console.log(user.Password)
          const hashed = await hashedPassword(newPassword);
          // console.log(hashed)
          await userModel.findByIdAndUpdate(user.id,{password:hashed})
          // console.log(user)
          return res.status(200).send({
            success: true,
            message: "Password changed Successfully",
          });
        } catch (error) {
          console.log(error);
          return res.status(500).send({
            success: false,
            message: "Something went wrong while forgetting password",
            error,
          });
        }
      };

      export const updateProfileController = async (req, res) => {
        try {
          const { name, username, password} = req.body;
          const user = await userModel.findById(req.user.id);
          //password
          if (password && password.length < 6) {
            return res.json({ error: "Password is required and 6 character long" });
          }
      
          const hashedPassword = password ? await hashedPassword(password) : undefined;
          const updatedUser = await userModel.findByIdAndUpdate(
            req.user.id,
            {
              name: name || user.name,
              password: hashedPassword || user.password,
            },
            { new: true }
          );
          res.status(200).send({
            success: true,
            message: "Profile Updated Successfully",
            updatedUser,
          });
        } catch (error) {
          console.log(error);
          res.status(400).send({
            success: false,
            message: "Error While Updating Profile",
            error,
          });
        }
      };