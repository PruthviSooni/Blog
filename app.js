const express = require("express");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
//express app
const app = express();

// MongoDB
const dbURL =
  "mongodb+srv://test:test1234@blogs-cluster-uwtkb.mongodb.net/collection?retryWrites=true&w=majority";
mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err));

// Register views engine
app.set("view engine", "ejs");

//listen for req's
app.listen(8008);

// static middleware loader
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

//Blog Routes
app.use(blogRoutes);

//About Page
app
  .get("/about", (req, res) => {
    res.render("about", { title: "About" });
  })
  .get("/about-us", (req, res) => {
    res.redirect("/about");
  });
//404 not found
app.use((req, res) => {
  res.render("404", { title: "404 Page Not Found" });
});
