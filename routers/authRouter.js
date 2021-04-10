const express = require("express")
const authRouter = express.Router()
const bcrypt = require("bcrypt")

const userRepository = require('../repositories/userRepository')
const validInfo = require("../middleware/validInfo")
const jwtGenerator = require("../utils/jwtGenerator")
const authorize = require("../middleware/authorize")

authRouter.post("/register", validInfo, async (req, res) => {
  const { user_email, user_name, user_password } = req.body;

  try {
    const user = await userRepository.getByEmail(user_email)
    if (user.length > 0) {
      return res.status(401).json("User already exist!")
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(user_password, salt);

    const newUser = await userRepository.post({user_name, user_password: bcryptPassword, user_email})      

    const jwtToken = jwtGenerator(newUser[0].id_user);

    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
})  

authRouter.post("/login", validInfo, async (req, res) => {
  const { user_email, user_password } = req.body;

  try {
    const user = await userRepository.getByEmail(user_email);

    if (user.length === 0) {
      return res.status(401).json("Invalid Credential");
    }

    const validPassword = await bcrypt.compare(
      user_password,
      user[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json("Invalid Credential");
    }
    const jwtToken = jwtGenerator(user[0].id_user);
    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

authRouter.post("/verify", authorize, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = authRouter;