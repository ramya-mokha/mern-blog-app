const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");
const PostModel = require("./models/Post");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/Users/ramya/Downloads/FullStackBlog/api/public/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname),
    );
  },
});
const upload = multer({ storage: storage });
const app = express();
app.use(express.json({ limit: "10mb" }));
app.use("/uploads", express.static("public/uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Not authenticated",
    });
  }
  try {
    const decoded = jwt.verify(token, "SECRET_KEY");
    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({
      message: "Invalid token",
    });
  }
};
app.get("/", (req, res) => {
  res.send("Everything is workign fine .");
});
app.post("/create", upload.single("file"), (req, res) => {
  const { title, summary, content } = req.body;
  jwt.verify(req.cookies.token, "SECRET_KEY", {}, async (err, info) => {
    if (err) {
      console.log(err.message);
      return res.json({ message: "Login failed" });
    }
    const postDoc = await PostModel.create({
      title: title,
      summary: summary,
      content: content,
      cover: req.file.filename,
      author: info.id,
    });
    console.log(postDoc);
    res.json({ message: "Post created" });
  });
});

app.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  const user = await User.findOne({
    user: userName,
  });
  console.log(user);
  if (!user) {
    return res.status(404).json({
      message: "User don't exist try Register",
    });
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({
      message: "incorrrect credentials",
    });
  } else {
    try {
      const token = await jwt.sign({ userName, id: user._id }, "SECRET_KEY");
      return res.cookie("token", token).json({
        id: user._id,
        userName,
      });
    } catch (err) {
      return res.json({ message: "error while creating a token" });
    }
  }
});

app.get("/post", async (req, res) => {
  const posts = await PostModel.find()
    .populate("author", ["user","_id"])
    .sort({ createdAt: -1 })
    .limit(20);
  res.json(posts);
});
app.post("/register", async (req, res) => {
  const { userName, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  try {
    await User.create({
      user: userName,
      password: hashPassword,
    });
    
    res.status(200).json({
      message: "Successfull login",
    });
  } catch (err) {
    res.status(404).json({
      message: "user already exists Try Login",
    });
  }
});

const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/FullStackBlog");
    console.log("mongo connected successfully");
  } catch {
    console.log("error occured");
  }
};

connectDb();
app.get("/profile", (req, res) => {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    return res.status(404).json({message:"Login"});
  }
    jwt.verify(token, "SECRET_KEY", {}, (err, info) => {
      if(err){
        return res.status(404).json({message:"Login to access"})
      }
      res.json(info);
  })
});
app.get("/post/:id", async (req, res) => {
  const id = req.params.id;
  const PostDoc = await PostModel.findById(id).populate("author", ["user"]);
  res.json(PostDoc);
});
app.post("/logout", (req, res) => {
  res.cookie("token", "");
  res.json({ message: "logged out of the session" });
});
app.put("/editPost/:id", upload.single("file"), async (req, res) => {
  const { title, summary, content } = req.body;

  jwt.verify(req.cookies.token, "SECRET_KEY", {}, async (err, info) => {
    if (err) {
      return res.json({ message: "Login failed" });
    }

    const post = await PostModel.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== info.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    let newCover = post.cover;

    if (req.file) {
      const fs = require("fs");
      const oldPath = path.join(__dirname, "uploads", post.cover);

      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }

      newCover = req.file.filename;
    }

    await PostModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          title,
          summary,
          content,
          cover: newCover,
        },
      },
    );

    res.json({ message: "Post updated successfully" });
  });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
