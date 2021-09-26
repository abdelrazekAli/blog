const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_TOKEN_SECRET } = process.env;
const { userValidation } = require("../utils/validation");
const generateAccessToken = require("../utils/token");
const userModel = require("../models/user.model");
const tokenModel = require("../models/token.model");

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
      ? res.status(409).send(`email : ${email} is already used`)
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
    let accessToken = generateAccessToken({ _id: user._id });
    let refreshToken = jwt.sign({ _id: user._id }, JWT_TOKEN_SECRET);

    // Save refresh toen to database
    await tokenModel.createNewToken(refreshToken);

    res
      .header("auth-token", accessToken)
      .json({
        username: user.username,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
  } catch (err) {
    res.status(500).send("Faild to login");
    console.log(err);
  }
};

exports.logout = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).send("token is required");

    // Check token in database
    let result = await tokenModel.checkToken(token);
    if (result.length === 0) return res.status(403).send("Invalid token");

    // Delete token from database
    await tokenModel.deleteToken(token);

    res.status(204).send("Successfully logout");
  } catch (err) {
    res.status(500).send("Failed to logout");
    console.log(err);
  }
};

exports.refreshToken = async (req, res) => {
  const refreshToken = req.body.token;
  try {
    if (!refreshToken) return res.status(400).send("token is required");

    // Check token in database
    let token = await tokenModel.checkToken(refreshToken);
    if (token.length === 0) return res.status(403).send("Invalid token");

    jwt.verify(refreshToken, JWT_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).send("Invalid token");
      const accessToken = generateAccessToken({ _id: user._id });
      res.status(200).send({ accessToken: accessToken });
    });
  } catch (err) {
    res.status(500).send("Failed to refresh token");
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
