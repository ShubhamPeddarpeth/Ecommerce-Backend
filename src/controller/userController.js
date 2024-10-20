import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const signupController = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    //validator
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //if user alredy exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email Already Exist' });
    }

    const newUser = new User({ firstName, lastName, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User Created Successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

 export const signInController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //check password is valid
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    //generate jwt token after authentication
    const token = jwt.sign({ id: user._id }, 'jwtsecret', { expiresIn: "10d" });
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
  const userId = req.query.id;
    const user = await User.findById(userId);
    if (!user) {
    return  res.status(404).json({ message: 'User Not Found' });
    }
  user.password = undefined;
    res.status(200).json(user);
  } catch (error) {
  console.error('Error fetching user details:', error);
  res.status(500).json({ message: 'Internal server error' });
  }
};
