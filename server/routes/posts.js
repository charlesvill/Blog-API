const { Router } = require("express");
const {
  getAllPosts,
  getCommentsByPostId,
  postComment,
  deleteComment,
  getAllPostsByUserId,
  createPost,
  updatePost,
  togglePublishPost,
  deletePost,
} = require("../controllers/postsController.js");

const postRouter = Router();

postRouter.get("/", getAllPosts);

postRouter.get("/:postid/comments", getCommentsByPostId);
    
postRouter.post("/:postid/comments/:userid", postComment);

postRouter.delete("/:postid/comments/:commentid", deleteComment);

// get all posts by user
postRouter.get("/:userid", getAllPostsByUserId);

// post a blog 
postRouter.post("/:userid", createPost);

postRouter.put("/:postid", updatePost);

postRouter.put("/:postid/publish", togglePublishPost);

postRouter.delete("/:postid", deletePost);


module.exports = postRouter;
