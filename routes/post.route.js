const multer = require("multer");
const router = require("express").Router();
const auth = require("./guards/auth.guard");
const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({ storage: inMemoryStorage }).single("image");

// Import post controllers
const {
  getPosts,
  getPost,
  createNewPost,
  updatePost,
  deletePostById,
  deleteAllPosts,
} = require("../controllers/post.contoller");

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", auth, uploadStrategy, createNewPost);
router.put("/:id", auth, uploadStrategy, updatePost);
router.delete("/:id", auth, deletePostById);

module.exports = router;
