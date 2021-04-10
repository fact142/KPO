const homeRouter = require('express').Router()
const userRepository = require('../repositories/userRepository')
const authorize = require("../middleware/authorize")

homeRouter.post("/", authorize, async (req, res) => {
    try {
      const user = await userRepository.get(req.user.id)
      console.log(user)
      res.json(user.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  })
  
  module.exports = homeRouter;

