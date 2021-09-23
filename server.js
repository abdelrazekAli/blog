const express = require("express");
const app = express();
const dotenv = require("dotenv").config();

// Import Routes
const postRouter = require("./routes/post.route");
const userRouter = require("./routes/user.route");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes Middlewares
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);
app.all("*", (req, res) =>
  res.send("You've tried reaching a route that doesn't exist.")
);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
