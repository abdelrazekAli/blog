const router = require("express").Router();
const auth = require("./guards/auth.guard");

// Import user controllers
const {
  getUsers,
  getUser,
  createNewUser,
  login,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", createNewUser);
router.post("/login", login);
router.put("/:id", auth, updateUser);
router.delete("/:id", auth, deleteUser);

module.exports = router;
