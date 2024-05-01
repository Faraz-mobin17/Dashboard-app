import {
  adminLogin,
  fetchAllUsers,
  updateAllUsers,
  updateUserByAdmin,
} from "../../src/controllers/admin.controller.js";
import express from "express";
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { updatePassword } from "../../src/controllers/user.controller.js";

const router = express.Router();

//router.post("/registerAdmin",registerAdmin);
router.post("/login", adminLogin);
router.get("/fetch", fetchAllUsers);
router.put("/updateUser/:user_id", verifyJWT, updateUserByAdmin);
router.put("/updateAll", updateAllUsers);

export default router;
