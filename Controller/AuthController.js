import authModel from "../Models/AuthModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerController = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(422)
        .json({ status: false, message: "Please provide all required field" });
    }

    const usernameExist = await authModel.findOne({ username: username });

    if (usernameExist) {
      return res
        .status(201)
        .json({ status: true, message: "username already exists" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new authModel({
      username: username,
      password: hash,
    });

    const response = await newUser.save();

    if (response) {
      return res
        .status(201)
        .json({ status: true, message: "Registration successfully" });
    }
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ status: false, message: "Internal server error", err: error });
  }
};

const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(422)
        .json({ status: false, message: "Please provide all required field" });
    }

    const usernameExist = await authModel.findOne({ username: username });

    if (!usernameExist) {
      return res
        .status(201)
        .json({ status: true, message: "username doesn't exist" });
    }
    const checkPassword = bcrypt.compareSync(password, usernameExist.password); // true

    if (usernameExist && checkPassword) {
      const token = jwt.sign({ username: username }, "SECRETTOKEN");

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      return res.status(201).json({status: true, message: "Login successfull"})
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Internal server error", err: error });
  }
};

export { registerController, loginController}
