const bcrypt = require("bcrypt");
const DB_URL = process.env.DB_URL;
const mongoose = require("mongoose");
const { Post } = require("./post.model");
const ObjectId = require("mongoose").Types.ObjectId;
const connectOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const userSchema = mongoose.Schema(
  {
    username: String,
    email: String,
    password: String,
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false } //To ignore __v
);

const User = mongoose.model("user", userSchema);

exports.getAllUsers = async () => {
  try {
    await mongoose.connect(DB_URL, connectOptions);
    let users = await User.find({});
    mongoose.disconnect();
    return users;
  } catch (err) {
    mongoose.disconnect();
    throw new Error(err);
  }
};

exports.getUserDetails = async (userId) => {
  try {
    await mongoose.connect(DB_URL, connectOptions);
    let user = await User.findById(userId);
    mongoose.disconnect();
    return user;
  } catch (err) {
    mongoose.disconnect();
    throw new Error(err);
  }
};

exports.createNewUser = async (username, email, password) => {
  try {
    await mongoose.connect(DB_URL, connectOptions);
    let emailCheck = await User.findOne({ email: email });
    if (emailCheck) return "Email is already used";
    else {
      let hashedPassword = await bcrypt.hash(password, 10);
      let newUser = new User({
        username: username,
        email: email,
        password: hashedPassword,
      });
      await newUser.save();
      mongoose.disconnect();
    }
  } catch (err) {
    mongoose.disconnect();
    throw new Error(err);
  }
};

exports.updateUser = async (id, username, email) => {
  try {
    await mongoose.connect(DB_URL, connectOptions);
    let user = await User.findById(id);
    if (user.email !== email) {
      let emailCheck = await User.findOne({ email: email });
      if (emailCheck) return "Email is already used";
    }
    await User.findByIdAndUpdate(id, {
      username: username,
      email: email,
    });
    mongoose.disconnect();
  } catch (err) {
    mongoose.disconnect();
    throw new Error(err);
  }
};

exports.deleteUser = async (id) => {
  try {
    await mongoose.connect(DB_URL, connectOptions);
    await User.findByIdAndDelete(id);

    // Delete user posts
    await Post.deleteMany({ createdBy: id });
  } catch (err) {
    mongoose.disconnect();
    throw new Error(err);
  }
};

exports.getUserByEmail = async (email) => {
  try {
    await mongoose.connect(DB_URL, connectOptions);
    let user = await User.findOne({ email: email });
    mongoose.disconnect();
    return user;
  } catch (err) {
    mongoose.disconnect();
    throw new Error(err);
  }
};

exports.checkId = async (id) => {
  try {
    if (ObjectId.isValid(id)) {
      await mongoose.connect(DB_URL, connectOptions);
      let user = await User.findById(id);
      mongoose.disconnect();
      if (user === null) return "User is not exist";
    } else return "User id is not valid";
  } catch (err) {
    mongoose.disconnect();
    throw new Error(err);
  }
};
