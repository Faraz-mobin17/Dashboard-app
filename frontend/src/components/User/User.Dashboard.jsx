import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user_id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/v1/users/${user_id}`);
        console.log("Data: ", data);
        setUser(data); // Update user state with fetched data
        setLoading(false);
      } catch (error) {
        setError(error.message); // Set error message if request fails
        setLoading(false);
      }
    };

    fetchUserDetails(); // Invoke the async function inside useEffect
  }, []); // Dependency on userId to refetch user details if userId changes

  if (loading) {
    return <p>Loading user details...</p>;
  }

  if (error) {
    return <p>Error fetching user details: {error}</p>;
  }

  if (!user) {
    return <p>User not found</p>;
  }
  const deleteUser = async () => {
    try {
      const res = await axios.delete(`/api/v1/users/${user_id}`);
      console.log(res);
      setUser(res);
    } catch (error) {
      console.log("error: ", error);
    }
  };
  const logoutUser = async () => {
    try {
      const response = await axios.post(`/api/v1/users/logout`);
      console.log(response);
      if (response.status === 201 || response.statusText === "OK") {
        navigate("/SignIn");
      }
    } catch (error) {
      setError(error);
      console.log("error:", error);
    }
  };
  return (
    <div>
      <h1 className="text-center text-3xl">Welcome: {user.username}</h1>
      <h2>User Details</h2>

      <table className="text-center w-full">
        <thead>
          <tr>
            <th>Email</th>
            <th>Username</th>
            <th>Admin</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {user.data.map((u) => (
            <tr key={u.user_id} className="bg-slate-900 text-white">
              <td>{u.email}</td>
              <td>{u.username}</td>
              <td>{u.is_Admin ? "Yes" : "No"}</td>
              <td>{u.mobileNo}</td>
              <td>
                <button
                  className="bg-red-900 text-white p-2"
                  onClick={deleteUser}
                >
                  Delete {console.log(u.user_id)}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Display additional user details as needed */}
      <button
        type="button"
        onClick={logoutUser}
        className="bg-slate-800 text-white p-2 rounded m-2"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
