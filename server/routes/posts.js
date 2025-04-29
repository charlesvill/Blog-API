const { Router } = require("express");
const prisma = require("../../prisma/prisma");
const { InternalServerError } = require("../utils/err");
const postRouter = Router();

postRouter.get("/", (req, res, next) => {
  res.send("GET request for posts!");
});

postRouter.get("/:postid/comments", async (req, res) => {
  // see all comments
  const postId = req.params.postid;
  try {
    const response = await prisma.post.findUnique({
      where: {
        id: Number(postId),
      },
      include: {
        comment: true,
      }
    });

    res.json(response);
  } catch (err) {
    return next(new InternalServerError(err.message));
  }
  // res.send("See all comments from the " + postId + "post id");
});

postRouter.post("/:postid/comments/:userid", async (req, res) => {
  // post a comment on a blog post
  const postId = req.params.postid;
  const userId = req.params.userid;

  const {content} = req.body;

  try {
    const response = await prisma.comment.create({
      data: {
        content,
        post: {
          connect:{
            id: Number(postId),
          },
        },
        author: {
          connect: {
            id: Number(userId),
          },
        },
      },
      include: {
        author: true,
      },
    });

    res.json(response);
} catch (err) {
    return next(new InternalServerError(err.message));
  }
  // res.send("post a comment on the " + postId + "post id");
});

postRouter.delete(("/:postid/comments/:commentid"), async(req, res) => {
  // delete a comment on a blog post
  
  const postId = req.params.postid;
  const commentId = req.params.commentid;

  try {
    const response = await prisma.comment.delete({
      where: {
        id: Number(commentId),
      },
    });

    res.json(response,  "there has been a deletion occur");
  } catch (err) {
    return next(new InternalServerError(err.message));
  }

  res.send("delete a comment on the " + postId + "post id and " + commentId + "comment id");
});

// get all posts by user
postRouter.get("/:userid", async(req, res, next) => {
  const userId = req.params.userid;

  try {
    const response = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
      include: {
        posts: true,
      },
    });

    res.json(response);
  } catch (err) {
    return next(new InternalServerError(err.message));
  }
});

// post a blog 
postRouter.post("/:userid", async (req, res, next) => {
  console.log("coming live from the post a blog router!");

  const {
    title,
    content,
  } = req.body; const userId = req.params.userid;

  try {
    const response = await prisma.post.create({
      data: {
        title,
        content,
        author: {
          connect: {
            id: Number(userId),
          }
        }
      },
      include: {
        author: true
      }
    });

    res.json(response);
  } catch (err) {
    console.error("we have an error");
    console.error(err);
    return next(new InternalServerError(err.message));
  }
});

postRouter.put("/:postid", async(req, res, next) => {
  const {
    title,
    content,
  } = req.body;
  const postId = req.params.postid;

  try {
    const response = await prisma.post.update({
      where: {
        id: Number(postId),
      },
      data: {
        title,
        content,
      },
    });

    res.json(response);
  } catch (err) {
    return next(new InternalServerError(err.message));
  }
});

postRouter.delete("/:postid", async(req, res, next) => {
  const postId = req.params.postid;

  try {
    const response = await prisma.post.delete({
      where: {
        id: Number(postId),
      },
    });

    res.json(response);
  } catch (err) {
    return next(new InternalServerError(err.message));
  }
});


module.exports = postRouter;
