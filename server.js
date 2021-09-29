const express = require("express");
const app = express();
const dotenv = require("dotenv").config();

// Import Routes
const postRouter = require("./routes/post.route");
const userRouter = require("./routes/user.route");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("./client/build"));

// Routes Middlewares
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

app.get("*", (req, res) => {
  res.sendFile("index.html", {
    root: __dirname + "/client/build",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
