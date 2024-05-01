import HttpStatusCodes from "../utils/httpStatusCodes.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";
import AuthService from "../middlewares/AuthService.middleware.js";
import db from "../database/db.js"; // Import your Database class instance
import { AdminService } from "../services/Admin/admin.service.js";
import { AdminRepository } from "../repositories/Admin/admin.repository.js";
// import { UserService } from "../services/User/user.service.js";
// import { UserRepository } from "../repositories/User/user.repository.js";

// Modify the instantiation of UserService to use the Database instanc
const Admin = new AdminService(new AdminRepository(db));
// const User = new UserService(new UserRepository(db));

const getAllUsersByAdmin = asyncHandler(async (_, res) => {
  const user = await Admin.getAllUsersByAdmin();
  if (!user || user.length === 0) {
    throw new ApiError(HttpStatusCodes.NOT_FOUND, "User not found");
  }
  return res
    .status(HttpStatusCodes.OK)
    .json(new ApiResponse(HttpStatusCodes.OK, user));
});

const getUserByAdmin = asyncHandler(async (req, res) => {
  const userId = Number(req.params.id) || 1;
  const user = await Admin.getUserByAdmin(userId);
  console.log("user controller getUser fn", user);
  if (user.length === 0 || !user) {
    throw new ApiError(400, "user not found");
  }
  return res
    .status(HttpStatusCodes.OK)
    .json(new ApiResponse(HttpStatusCodes.OK, user));
});

const deleteUserByAdmin = asyncHandler(async (req, res) => {
  const userId = Number(req.params.id);
  const user = await Admin.deleteUserByAdmin(userId);
  if (!user || user.length === 0) {
    throw new ApiError(HttpStatusCodes.BAD_REQUEST, "User not delete");
  }
  return res
    .status(HttpStatusCodes.OK)
    .json(new ApiResponse(HttpStatusCodes.OK, "User deleted successfully"));
});

const updateUserByAdmin = asyncHandler(async (req, res) => {
  const id = Number(req.params.id) || 1;

  const result = await Admin.updateUserByAdmin(req.body, id);

  if (!result || result.length === 0) {
    throw new ApiError(HttpStatusCodes.CONFLICT, "User not updated");
  }

  return res
    .status(HttpStatusCodes.OK)
    .json(new ApiResponse(HttpStatusCodes.OK, "User updated"));
});

const logoutAdmin = asyncHandler(async (_, res) => {
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(HttpStatusCodes.OK)
    .clearCookie("token", options)
    .json({ message: "User logged out", success: true });
});

const loginAdmin = asyncHandler(async (req, res) => {
  const response = await Admin.loginAdmin(req.body.email, req.body.password);
  console.log("Inside user controller login user:", response);
  const options = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
  };

  return res
    .status(HttpStatusCodes.OK)
    .cookie("token", response, options)
    .json(new ApiResponse(HttpStatusCodes.OK, response));
});

export {
  getAllUsersByAdmin,
  updateUserByAdmin,
  deleteUserByAdmin,
  loginAdmin,
  logoutAdmin,
  getUserByAdmin,
};
