import React from "react";
import UserMenu from "../../Components/UserMenu";
import { useAuth } from "../../Context/authContext";

function Dashboard() {
  const { auth } = useAuth();
  return (
    <div className="row">
      <div className="col-md-3">
        <UserMenu />
      </div>
      <div className="col-md-9 pt-5" style={{ fontSize: "25px" }}>
        <div className="card w-75 p-3">
          <h1>{auth?.user?.name}</h1>
          <h1>{auth?.user?.username}</h1>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;