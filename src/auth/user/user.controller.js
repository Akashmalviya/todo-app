import express from "express";
import UserModel from "./user.schema.js";

const secret = "s0//P4$$w0rD";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const user = new UserModel({
      email,
      password,
      firstName,
      lastName,
    });

    const validate = user.validateSync();
    if (validate) {
      return res.status(400).send({ message: validate.message });
    }
    await user.save();
    return res.status(201).send({ message: "User created" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: `Error creating user ${error.message}` });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(401).send({ message: "Invalid credentials" });
  }
  const validatePassword = user.validatePassword(password);
  if (!validatePassword) {
    return res.status(401).send({ message: "Invalid credentials" });
  }
  return res.status(200).send({ ...user });
});

export default router;
