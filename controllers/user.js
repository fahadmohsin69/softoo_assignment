import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Password" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.SECRET
    );

    res.status(200).json({ result: existingUser, token });
  } 
  
  catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(404).json({ message: "User already exist." });
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await User.create({
      user_Id,
      email,
      password: hashedPassword,
      timestamp: Date.now(),
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.SECRET
    );
    res.status(200).json({ result, token });
  } 
  
  catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const updatePassword = async (req, res) => {
  const { email, password, upassword } = req.body;

  try {
    if (password !== upassword)
      return res.status(404).json({ message: "Passwords don't match." });

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await User.findByIdAndUpdate(
      req.userId,
      { password: hashedPassword },
      { new: true }
    );
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

export const allUsers = async (req, res) => {
  try {
    const list = await User.find();
    console.log(list);
    res.status(200).json(list);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const oneUser = async (req, res) => {
  try {
    const { user_Id } = req.body;
    const list = await User.findById(user_Id);
    console.log(list);
    res.status(200).json(list);
    console.log(user_Id)
  } 
  catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { user_Id, name } = req.body;
    const list = await User.findByIdAndUpdate(user_Id, name, { new: true });
    console.log(list);
    res.status(200).json({ message: " Profile Updated" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { user_Id } = req.body;
    await User.findByIdAndDelete(user_Id);
    res.status(200).json({ message: " User Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
