const { Router } = require("express");
const prisma = require("../../prisma/prisma");
const { InternalServerError } = require("../utils/err");
const postRouter = Router();

postRouter.get("/", (req, res, next) => {
  res.send("GET request for posts!");
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
  const postId = req.params.id;

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

module.exports = postRouter;
