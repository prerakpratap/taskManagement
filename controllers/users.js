const userService = require("../services/users");

const signup = async (req, res) => {
  try {
    let user = await userService.signup(req.body);
    res.json(user);
  } catch (e) {
    res.json(e);
  }
};

const login = async (req, res) => {
  try {
    let userRecord = await userService.login(req.body);
    res.json(userRecord);
  } catch (e) {
    res.json(e);
  }
};

module.exports = {
  signup: signup,
  login: login,
};
