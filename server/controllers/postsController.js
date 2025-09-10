const { InternalServerError } = require("../utils/err");
const prisma = require("../../prisma/prisma");

async function getAllPosts(req, res, next) {
  // should output the first 10 posts
  // case: /posts?popular=true ->
  const featPopular = req.query.popular === "true";

  try {
    let response;

    if (!featPopular) {
      console.log("regular feed to be posted");
      response = await prisma.post.findMany({
        take: 10,
        where: {
          published: true,
        },
      });
    } else {
      console.log("there should be a popular posts being sent");
      response = await prisma.post.findMany({
        take: 3,
        where: {
          published: true,
        },
        orderBy: {
          likes: {
            _count: "desc",
          },
        },
      });
    }

    res.json(response);
  } catch (err) {
    return next(new InternalServerError(err));
  }
}

async function getPostByPostId(req, res, next) {
  // see all comments
  const postId = req.params.postid;
  try {
    const response = await prisma.post.findUnique({
      where: {
        id: Number(postId),
      },
      select: {
        id: true,
        title: true,
        content: true,
        img_url: true,
        published_at: true,
        comments: {
          select: {
            content: true,
            published_at: true,
            author: {
              select: {
                username: true,
              },
            },
          },
        },
        author: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });

    res.json(response);
  } catch (err) {
    return next(new InternalServerError(err.message));
  }
}
async function postComment(req, res, next) {
  // post a comment on a blog post
  const userId = req.params.userid;
  const postId = req.params.postid;
  const { content } = req.body;

  try {
    const response = await prisma.comment.create({
      data: {
        content,
        post: {
          connect: {
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
}

async function deleteComment(req, res, next) {
  // delete a comment on a blog post

  const postId = req.params.postid;
  const commentId = req.params.commentid;

  try {
    const response = await prisma.comment.delete({
      where: {
        id: Number(commentId),
      },
    });

    res.json(response, "there has been a deletion occur");
  } catch (err) {
    return next(new InternalServerError(err.message));
  }

  res.send(
    "delete a comment on the " +
      postId +
      "post id and " +
      commentId +
      "comment id",
  );
}

async function getAllPostsByUserId(req, res, next) {
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

    res.json(response.posts);
  } catch (err) {
    return next(new InternalServerError(err.message));
  }
}

async function createPost(req, res, next) {
  const { title, content, img_url } = req.body;
  const userId = req.params.userid;

  try {
    const response = await prisma.post.create({
      data: {
        title,
        content,
        img_url,
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
    console.error("we have an error");
    console.error(err);
    return next(new InternalServerError(err.message));
  }
}

async function updatePost(req, res, next) {
  const { title, content, img_url } = req.body;
  const postId = req.params.postid;

  try {
    const response = await prisma.post.update({
      where: {
        id: Number(postId),
      },
      data: {
        title,
        content,
        img_url,
      },
    });

    res.json(response);
  } catch (err) {
    return next(new InternalServerError(err.message));
  }
}

async function togglePublishPost(req, res, next) {
  const postId = req.params.postid;
  let published;
  // step one, see if its published
  try {
    const response = await prisma.post.findUnique({
      where: {
        id: Number(postId),
      },
    });
    published = response.published;

    console.log("current post is published: ", published);
  } catch (err) {
    return next(new InternalServerError(err.message));
  }
  // step two, toggle boolean
  const newState = published === true ? false : true;
  console.log("this post will now be published: ", newState);

  try {
    const response = await prisma.post.update({
      where: {
        id: Number(postId),
      },
      data: {
        published: newState,
      },
    });

    res.json(response);
  } catch (err) {
    return next(new InternalServerError(err.message));
  }
}

async function toggleLike(req, res, next) {
  const postId = req.params.postid;
  const userId = req.params.userid;

  // first see if its been liked
  try {
    const response = await prisma.like.findUnique({
      where: {
        likeId: {
          post_id: Number(postId),
          user_id: Number(userId),
        },
      },
    });
    if (response) {
      // if found:
      // like.delete where user id && post id match
      const response = await prisma.like.delete({
        where: {
          likeId: {
            post_id: Number(postId),
            user_id: Number(userId),
          },
        },
      });
      console.log("Like was toggled off");
      res.json(response);
    } else {
      const response = await prisma.like.create({
        data: {
          post: {
            connect: {
              id: Number(postId),
            },
          },
          user: {
            connect: {
              id: Number(userId),
            },
          },
        },
      });
      console.log("like was toggled on!");
      res.json(response);
    }
  } catch (err) {
    return next(new InternalServerError(err.message));
  }
}

async function deletePost(req, res, next) {
  const postId = req.params.postid;

  // will have to come in here and refactor for the likes as well
  try {
    const response = await prisma.comment
      .deleteMany({
        where: {
          post_id: Number(postId),
        },
      })
      .then(async () => {
        const response = await prisma.like.deleteMany({
          where: {
            post_id: Number(postId),
          },
        });
      })
      .then(async () => {
        const response = await prisma.post.delete({
          where: {
            id: Number(postId),
          },
        });
        return response;
      });
    console.log("we have deleted a post: ", response);

    res.json("successfully deleted post!");
  } catch (err) {
    return next(new InternalServerError(err.message));
  }
}

module.exports = {
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
};
