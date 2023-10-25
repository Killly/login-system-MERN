import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../models/User.js";

export const register = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      passwordHash: hash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "UserSecretKey",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.status(201).json({
      token,
      ...userData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Registration failed",
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      email: req.body.email,
    });

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    }

    const isPasswordValid = bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isPasswordValid) {
      res.status(404).json({
        message: "Wrong email or password",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "UserSecretKey",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.status(200).json({
      token,
      ...userData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Login failed",
    });
  }
};

export const getUSer = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.status(200).json({
      ...userData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Data fetching failed",
    });
  }
};
