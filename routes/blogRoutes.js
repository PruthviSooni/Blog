const express = require("express");
const blogController = require("../controllers/blogControllers");
const router = express.Router();

router
  //Home Page
  .get("/", blogController.blog_redirect)

  //Create Blog Page
  .get("/blogs/create", blogController.blog_create_get)

  // redirect to specific blog
  .get("/blogs/:blogID", blogController.blog_details)

  // All blogs route
  .get("/blogs", blogController.blog_index)

  // Add Blogs in DB
  .post("/blogs", blogController.blog_add)

  // Delete blogs
  .delete("/blogs/:blogID", blogController.blog_delete)

  // Fetch all data in json format
  .get("/json", blogController.blog_json);

module.exports = router;
