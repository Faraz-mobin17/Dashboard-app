import express from "express";
import { verifyJWT } from "../../middlewares/JWTauth.middleware.js";
import {
  getAllUsers,
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
  deleteUser,
} from "../../controllers/user.controller.js";
import {
  validateSignin,
  validateSignup,
  validateUpdateQuery,
} from "../../middlewares/validators.middleware.js";

const router = express.Router();

// GET all users
router.get("/", getAllUsers);

// Register user
router.post("/register", validateSignup, registerUser);

// Login user
router.post("/login", validateSignin, loginUser);

// Logout user
router.post("/logout", verifyJWT, logoutUser);

// Routes for specific user by ID
router
  .route("/:id")
  .get(verifyJWT, getUser)
  .patch(verifyJWT, validateUpdateQuery, updateUser)
  .delete(verifyJWT, deleteUser);

export default router;
