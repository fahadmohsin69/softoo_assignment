import express from "express";
import {
  login,
  signup,
  updatePassword,
  updateUser,
  oneUser,
  allUsers,
  deleteUser,
} from "../controllers/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/allUsers", allUsers);
router.patch("/oneUser", auth, oneUser);
router.patch("/updatePassword", auth, updatePassword);
router.put("/updateUser", updateUser);
router.delete("/deleteUser", deleteUser);


export default router;
