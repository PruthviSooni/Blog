const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const { get, result } = require("lodash");
//express app
const app = express();

// MongoDB
const dbURL =
  "mongodb+srv://test:test1234@blogs-cluster-uwtkb.mongodb.net/collection?retryWrites=true&w=majority";
mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log("connected to db"))
  .catch((err) => console.log(err));

// Register views engine
app.set("view engine", "ejs");

//listen for req's
app.listen(8008);

// static middleware loader
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app
  //Home Page
  .get("/", (req, res) => {
    res.redirect("/blogs");
  })

  //About Page
  .get("/about", (req, res) => {
    res.render("about", { title: "About" });
  })
  .get("/about-us", (req, res) => {
    res.redirect("/about");
  })

  // All blogs route
  .get("/blogs", (req, res) => {
    Blog.find()
      .sort({ createdAt: -1 })
      .then((result) => res.render("index", { title: "Home", blogs: result }))
      .catch((err) => console.log(err));
  })

  // redirect to specific blog
  .get("/blogs/:id", (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
      .then((result) => {
        res.render("detail", { title: "Blog Detail", blog: result });
      })
      .catch((err) => console.log(err));
  })

  // Add Blogs in DB
  .post("/blogs", (req, res) => {
    const blog = new Blog(req.body);
    blog
      .save()
      .then((result) => {
        res.redirect("/blogs");
      })
      .catch((err) => console.log(err));
  })

  //Create Blog Page
  .get("/blogs/create", (req, res) => {
    res.render("create", { title: "Snippet" });
  })

  // Fetch all data in json format
  .get("/json", (req, res) => {
    Blog.find()
      .then((result) => {
        res.send(result);
      })
      .catch((err) => console.log(err));
  })

  //404 not found
  .use((req, res) => {
    res.render("404", { title: "404 Page Not Found" });
  });
