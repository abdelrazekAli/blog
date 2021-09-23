const router = require("express").Router();
const auth = require("./guards/auth.guard");
const admin = require("./guards/admin.guard");
const {
  getPosts,
  getPost,
  createNewPost,
  updatePost,
  deletePostById,
  deleteAllPosts,
} = require("../controllers/post.contoller");
const multer = require("multer");
const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({ storage: inMemoryStorage }).single("image");

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", auth, uploadStrategy, createNewPost);
router.put("/:id", auth, uploadStrategy, updatePost);
router.delete("/", auth, admin, deleteAllPosts);
router.delete("/:id", auth, admin, deletePostById);

module.exports = router;
