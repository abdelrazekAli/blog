const router = require("express").Router();
const auth = require("./guards/auth.guard");
const admin = require("./guards/admin.guard");
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
router.delete("/:id", auth, admin, deleteUser);

module.exports = router;
