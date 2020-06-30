const Blog = require("../models/blog");
const { isNull } = require("lodash");

//blog redirect
const blog_redirect = (req, res) => {
  res.redirect("/blogs");
};

// Blog Index
const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => res.render("index", { title: "Home", blogs: result }))
    .catch((err) => console.log(err));
};

//Blog Details
const blog_details = (req, res) => {
  const id = req.params.blogID;
  Blog.findById(id)
    .then((result) => {
      if (result != null) {
        res.render("detail", { title: "Blog Detail", blog: result });
      } else {
        res.write("data not found!");
      }
    })
    .catch(() => res.render("404", { title: "404 Page Not Found" }));
};

// Blog post
const blog_add = (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => console.log(err));
};

// Blog create get
const blog_create_get = (req, res) => {
  res.render("create", { title: "Snippet" });
};

//Blog delete
const blog_delete = (req, res) => {
  const id = req.params.blogID;
  Blog.findByIdAndDelete(id)
    .then(() => {
      res.json({
        redirect: "/blogs",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
// Blog in json format
const blog_json = (req, res) => {
  Blog.find()
    .then((result) => {
      if (result != isNull) {
        res.send(result);
      } else {
        res.send({ error: 'Blogs not found' });
      }
    })
    .catch((err) => console.log(err));
};
module.exports = {
  blog_redirect,
  blog_index,
  blog_details,
  blog_delete,
  blog_add,
  blog_json,
  blog_create_get,
};
