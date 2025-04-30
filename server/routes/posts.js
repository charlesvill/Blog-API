const { Router } = require("express");
const {
  getCommentsByPostId,
  postComment,
  deleteComment,
  getAllPostsByUserId,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postsController.js");

const postRouter = Router();

postRouter.get("/", (req, res, next) => {
  res.send("GET request for posts!");
});

postRouter.get("/:postid/comments", getCommentsByPostId);
    
postRouter.post("/:postid/comments/:userid", postComment);

postRouter.delete("/:postid/comments/:commentid", deleteComment);

// get all posts by user
postRouter.get("/:userid", getAllPostsByUserId);

// post a blog 
postRouter.post("/:userid", createPost);

postRouter.put("/:postid", updatePost);

postRouter.delete("/:postid", deletePost);


module.exports = postRouter;
