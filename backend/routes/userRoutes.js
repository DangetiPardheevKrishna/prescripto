import express from "express";
import {
  appointments,
  bookAppointment,
  cancelAppointment,
  getProfile,
  updateProfile,
  userLogin,
  userRegistration,
} from "../controllers/userControllers.js";
import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.post("/register", userRegistration);
userRouter.post("/login", userLogin);
userRouter.get("/get-profile", authUser, getProfile);
userRouter.post(
  "/update-profile",
  upload.single("image"),
  authUser,
  updateProfile
);
userRouter.post("/book-appointment", authUser, bookAppointment);
userRouter.get("/appointments", authUser, appointments);
userRouter.post("/cancel-appointment", authUser, cancelAppointment);
export default userRouter;
