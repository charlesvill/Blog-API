const { Router } = require("express");
const {
  getAllPosts,
  getPostByPostId,
  postComment,
  deleteComment,
  getAllPostsByUserId,
  createPost,
  updatePost,
  togglePublishPost,
  toggleLike,
  deletePost,
} = require("../controllers/postsController.js");

const postRouter = Router();

postRouter.get("/", getAllPosts);

//two below do same thing, check response if I need to split the fns
postRouter.get("/:postid", getPostByPostId);

postRouter.get("/:postid/comments", getPostByPostId);
    
postRouter.post("/:postid/comments/:userid", postComment);

postRouter.delete("/:postid/comments/:commentid", deleteComment);

// get all posts by user
postRouter.get("/user/:userid", getAllPostsByUserId);

// post a blog 
postRouter.post("/:userid", createPost);

postRouter.put("/:postid", updatePost);

postRouter.put("/:postid/publish", togglePublishPost);

postRouter.put("/:postid/like/:userid", toggleLike);

postRouter.delete("/:postid", deletePost);


module.exports = postRouter;
