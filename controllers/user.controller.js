const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { userValidation } = require("../utils/validation");

exports.getUsers = async (req, res) => {
  try {
    let users = await userModel.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send("Faild to get users");
    console.log(err);
  }
};

exports.getUser = async (req, res) => {
  try {
    let userId = req.params.id;

    let checkResult = await userModel.checkId(userId);
    if (checkResult) return res.status(400).send(checkResult);

    let user = await userModel.getUserDetails(userId);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send("Faild to get user");
    console.log(err);
  }
};

exports.createNewUser = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).send("username, email, password are required");
    }

    let validationResult = userValidation(req.body);
    if (validationResult)
      return res.status(400).send(validationResult.details[0].message);

    let result = await userModel.createNewUser(username, email, password);
    result
      ? res.status(400).send(`email : ${email} is already used`)
      : res.status(200).send("User successfully added");
  } catch (err) {
    res.status(500).send("Failed to create new user");
    console.log(err);
  }
};

exports.login = async (req, res) => {
  try {
    let { email, password } = req.body;

    // Check email and password
    if (!email || !password)
      res.status(400).send("Email and password are required");
    let validationResult = userValidation(req.body);
    if (validationResult)
      return res.status(400).send(validationResult.details[0].message);

    // Check if email exist
    let user = await userModel.getUserByEmail(email);
    if (!user) return res.status(400).send("Invalid email or password");

    // Check if password is correct
    let compareResult = await bcrypt.compare(password, user.password);
    if (!compareResult)
      return res.status(400).send("Invalid email or password");

    // Create and assign a token
    let token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN_SECRET);
    res.header("auth-token", token).json({ token: token });
  } catch (err) {
    res.status(500).send("Faild to login");
    console.log(err);
  }
};

exports.updateUser = async (req, res) => {
  try {
    let id = req.params.id;

    // Check user id
    let checkResult = await userModel.checkId(id);
    if (checkResult) return res.status(400).send(checkResult);

    if (req.user._id === id) {
      let { username, email } = req.body;
      let validationResult = userValidation(req.body);
      if (validationResult)
        return res.status(400).send(validationResult.details[0].message);

      let result = await userModel.updateUser(id, username, email);
      result
        ? res.status(400).send(result)
        : res.status(200).send("User successfully updated");
    } else return res.status(403).send("You can only update your account");
  } catch (err) {
    res.status(500).send("Failed to update user");
    console.log(err);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    let id = req.params.id;

    // Check user id
    let checkResult = await userModel.checkId(id);
    if (checkResult) return res.status(400).send(checkResult);

    if (req.user._id === id) {
      await userModel.deleteUser(id);
      res.status(200).send(`Successfully deleted user with id : ${id}`);
    } else return res.status(403).send("You can only delete your account");
  } catch (err) {
    res.status(500).send("Failed to delete user");
    console.log(err);
  }
};
