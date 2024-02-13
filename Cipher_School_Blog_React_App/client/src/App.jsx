import { useState } from "react";
import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./Pages/Home";
import Layout from "./Pages/Layout";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Blog from "./Pages/Blog";
import PrivateRoute from "./route/Private";
import Profile from "./Pages/user/Profile";
import Dashboard from "./Pages/user/Dashboard";
import Blogs from "./Pages/user/Blogs";
import CreateBlog from "./Pages/user/CreateBlog";
import UpdateBlog from "./Pages/user/UpdateBlog";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home/>} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="blog/:id" element={<Blog />} />
        <Route path="dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/blogs" element={<Blogs />} />
          <Route path="user/create-blog" element={<CreateBlog />} />
          <Route path="user/blogs/update-blog/:id" element={<UpdateBlog />} />
        </Route>
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;