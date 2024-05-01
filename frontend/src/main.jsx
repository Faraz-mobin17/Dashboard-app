import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Layout from "./Layout/Layout.jsx";
import { SignIn } from "./components/User/user.signin.jsx";
import Home from "./pages/Home.jsx";
import {
  BrowserRouter,
  Routes,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Dashboard from "./components/User/user.dashboard.jsx";
import { SignUp } from "./components/User/user.signup.jsx";
import { AdminSignIn } from "./components/Admin/admin.sigin";
import AdminDashboard from "./components/Admin/admin.dashboard.jsx";
const AppRouter = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Parent route with nested routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} /> {/* Default nested route */}
        <Route path="SignIn" element={<SignIn />} />
        <Route path="SignUp" element={<SignUp />} />
        <Route path="users/dashboard/:user_id" element={<Dashboard />} />
      </Route>
      {/* Separate parent route with nested routes */}
      <Route path="admin" element={<Layout />}>
        <Route index element={<AdminSignIn />} /> {/* Default nested route */}
        <Route path="SignIn" element={<AdminSignIn />} />
        <Route path="dashboard" element={<AdminDashboard />} />
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={AppRouter} />
  </React.StrictMode>
);
