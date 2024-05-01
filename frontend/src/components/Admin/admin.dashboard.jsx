import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/v1/admin/`);
        console.log("Data: ", data);
        setAdmin(data); // Update user state with fetched data
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

  if (!admin) {
    return <p>User not found</p>;
  }
  const deleteUser = async (id) => {
    try {
      const data = await axios.delete(`/api/v1/admin/${id}`);
      console.log(data);
      setAdmin(data.data);
    } catch (error) {
      console.log("error: ", error);
    }
  };
  const logoutAdmin = async () => {
    try {
      const response = await axios.post(`/api/v1/admin/logout`);
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
      <h1 className="text-center text-3xl">Welcome Admin</h1>
      <h2>Users Details</h2>

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
          {admin.data.map((u) => (
            <tr key={u.id} className="bg-slate-900 text-white">
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.is_Admin}</td>
              <td>{u.mobileNo}</td>

              <td>
                <button
                  className="bg-red-900 text-white p-2"
                  onClick={() => deleteUser(u.id)}
                >
                  Delete {console.log(u.id)}
                </button>
                <button
                  className="bg-green-900 text-white p-2"
                  onClick={() => updateUser(u.id)}
                >
                  Update {console.log(u.id)}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Display additional user details as needed */}
      <button
        type="button"
        onClick={logoutAdmin}
        className="bg-slate-800 text-white p-2 rounded m-2"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminDashboard;
