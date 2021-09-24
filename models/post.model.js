const DB_URL = process.env.DB_URL;
const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;
const connectOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const postSchema = mongoose.Schema(
  {
    title: String,
    body: String,
    postImg: String,
    createdAt: Number,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  { versionKey: false } //To ignore __v
);

const Post = mongoose.model("post", postSchema);
exports.Post = Post;

exports.getAllPosts = async () => {
  try {
    await mongoose.connect(DB_URL, connectOptions);
    let posts = await Post.find({}).populate({
      path: "createdBy",
      model: "user",
      select: "username email",
    });
    mongoose.disconnect();
    return posts;
  } catch (err) {
    mongoose.disconnect();
    throw new Error(err);
  }
};

exports.getUserPosts = async (userId) => {
  try {
    await mongoose.connect(DB_URL, connectOptions);
    let posts = await Post.find({ createdBy: userId }).populate({
      path: "createdBy",
      model: "user",
      select: "username email",
    });
    mongoose.disconnect();
    return posts;
  } catch (err) {
    mongoose.disconnect();
    throw new Error(err);
  }
};

exports.getPostDetails = async (postId) => {
  try {
    await mongoose.connect(DB_URL, connectOptions);
    let post = await Post.findById(postId).populate({
      path: "createdBy",
      model: "user",
      select: "username email",
    });
    mongoose.disconnect();
    return post;
  } catch (err) {
    mongoose.disconnect();
    throw new Error(err);
  }
};

exports.createNewPost = async (title, body, postImg, createdBy) => {
  try {
    await mongoose.connect(DB_URL, connectOptions);
    let newPost = new Post({
      title: title,
      body: body,
      postImg: postImg,
      createdAt: Date.now(),
      createdBy: createdBy,
    });
    let post = await newPost.save();
    mongoose.disconnect();
    return post;
  } catch (err) {
    mongoose.disconnect();
    throw new Error(err);
  }
};

exports.updatePost = async (id, title, body, postImg) => {
  try {
    await mongoose.connect(DB_URL, connectOptions);
    let post = await Post.findByIdAndUpdate(id, {
      title: title,
      body: body,
      postImg: postImg,
    });
    mongoose.disconnect();
    return post;
  } catch (err) {
    mongoose.disconnect();
    throw new Error(err);
  }
};

exports.deleteAllPosts = async () => {
  try {
    await mongoose.connect(DB_URL, connectOptions);
    await Post.deleteMany({});
    mongoose.disconnect;
    return true;
  } catch (err) {
    mongoose.disconnect();
    throw new Error(err);
  }
};

exports.deletePostById = async (postId) => {
  try {
    await mongoose.connect(DB_URL, connectOptions);
    let deletedPost = await Post.findByIdAndDelete(postId);
    mongoose.disconnect();
    return deletedPost;
  } catch (err) {
    mongoose.disconnect();
    throw new Error(err);
  }
};

exports.checkId = async (id) => {
  try {
    if (ObjectId.isValid(id)) {
      await mongoose.connect(DB_URL, connectOptions);
      let post = await Post.findById(id);
      mongoose.disconnect();
      if (post === null) return "Post is not exist";
    } else return "Post id is not valid";
  } catch (err) {
    mongoose.disconnect();
    throw new Error(err);
  }
};
