import {
  getAllUsersByAdmin,
  deleteUserByAdmin,
  getUserByAdmin,
  loginAdmin,
  logoutAdmin,
  updateUserByAdmin,
} from "../../controllers/admin.controller.js";
import express from "express";

const router = express.Router();

//router.post("/registerAdmin",registerAdmin);
router.get("/", getAllUsersByAdmin);
router.get("/:id", getUserByAdmin);
router.delete("/:id", deleteUserByAdmin);
router.put("/:id", updateUserByAdmin);
router.post("/signin", loginAdmin);
router.post("/logout", logoutAdmin);
router.post("/login", loginAdmin);

export default router;
