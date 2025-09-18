import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import AdminModel from "../models/adminModel.js";

const jwtSecret = process.env.JWT_SECRET;

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const { _id: id, password: hashedPassword } = await AdminModel.findOne({
      username,
    });

    const isAdmin = bcrypt.compareSync(password, hashedPassword);

    if (!isAdmin) {
      res.status(401).json({ message: "Wrong credentials!" });
      return;
    }

    const token = jwt.sign(
      { userId: id, username, isAdmin: isAdmin },
      jwtSecret
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({ id, message: "Logged in!" });
    req.user = { userId: id, username, isAdmin: isAdmin };
  } catch (err) {
    res.status(401).json({ message: "Something went wrong! Could not login!" });
  }
};

export const logout = async (req, res) => {
  const isAdmin = req.user?.isAdmin;
  if (!isAdmin) {
    res.status(401).status("Unauthorized");
    return;
  }

  res.clearCookie("token").status(200).json("Logged out!").end();
};

export const register = async (req, res) => {
  const isAdmin = req.user?.isAdmin;
  if (!isAdmin) {
    res.status(401).status("Unauthorized");
    return;
  }

  const { username, password } = req.body;

  if (password.trim().length < 8) {
    res.status(400).json({
      message:
        "Twoje hasło jest za krótkie! Musi się składać przynajmniej z 8 znaków!",
    });
    return;
  }
  try {
    const allAdmins = await AdminModel.find();
    if (allAdmins.length > 2) return;
    const hashedPassword = bcrypt.hashSync(password, 10);

    await AdminModel.create({ username, password: hashedPassword });

    res.json("Admin created!");
  } catch (err) {
    res
      .status(400)
      .json({ message: "Something went wrong! Could not create an admin!" });
  }
};
