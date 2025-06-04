import { json } from "express";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import validator from "validator";
import jwt from "jsonwebtoken";
import doctorModel from "../models/doctorModel.js";
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      experience,
      degree,
      fees,
      about,
      address,
    } = req.body;
    const imageFile = req.file;
    console.log(
      {
        name,
        email,
        password,
        speciality,
        experience,
        degree,
        fees,
        about,
        address,
      },
      imageFile
    );
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !experience ||
      !degree ||
      !fees ||
      !about ||
      !address
    ) {
      return res.json({ success: false, error: "Missing Details" });
    }
    console.log(password);

    if (!validator.isEmail(email)) {
      return res.json({ success: false, error: "Not a valid email" });
    }
    if (password.length < 6) {
      return res.json({
        success: false,
        error: "Password Length must be greater than 6 characters",
      });
    }
    console.log(password);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword);
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    const imageUrl = imageUpload.secure_url;
    console.log(imageUrl);
    const doctorData = {
      name,
      email,
      password: hashedPassword,
      experience,
      speciality,
      degree,
      fees,
      address: JSON.parse(address),
      about,
      date: Date.now(),
      image: imageUrl,
    };
    console.log(doctorData);
    const newDoctor = new doctorModel(doctorData);
    console.log(newDoctor);
    await newDoctor.save();
    console.log(newDoctor);
    return res.json({ success: true, message: "Doctor Added" });
  } catch (error) {
    console.log(error);
    return res.send({ message: error });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      console.log(token);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, error: "Enter Valid Credentials" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: error });
  }
};

const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    console.log(doctors);
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error.message);
    res.json({ success: fasle, message: error.message });
  }
};

export { addDoctor, allDoctors, loginAdmin };
