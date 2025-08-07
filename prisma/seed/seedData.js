const fs = require("fs");
const prisma = require("../prisma");
const { InternalServerError } = require("../../server/utils/err");

const rawJSON = fs.readFileSync("./phony_seed_data.json", "utf8");
const data = JSON.parse(rawJSON);

console.log(data);

async function seedUsers() {
  const users = data.users;
  try {
    const response = await prisma.user
      .createMany({
        data: users,
      })
      .then((response) => console.log(response));
  } catch (err) {
    console.error(InternalServerError(err.message + "error seeding users"));
    return;
  }
}

async function seedPosts() {
  const posts = data.posts;
  try {
    await Promise.all(
      posts.map((post) =>
        prisma.post.create({
          data: {
            title: post.title,
            img_url: post.img_url,
            content: post.content,
            published: post.published,
            author: {
              connect: {
                id: Number(post.author_id),
              },
            },
            published_at: post.published_at,
            updated_at: post.updated_at,
          },
          include: {
            author: true,
          },
        }),
      ),
    ).then(() => console.log("posts have finished seeding"));
  } catch (err) {
    console.error(InternalServerError(err.message + "error seeding Posts"));
    return;
  }
}

async function seedLikes() {
  const likes = data.likes;
  try {
    await Promise.all(
      likes.map((like) =>
        prisma.like.create({
          data: {
            like_at: like.like_at,
            user: {
              connect: {
                id: like.user_id,
              },
            },
            post: {
              connect: {
                id: like.post_id,
              },
            },
          },
          include: {
            post: true,
            user: true,
          },
        }),
      ),
    ).then(() => console.log("likes have finished seeding"));
  } catch (err) {
    console.error(InternalServerError(err.message + "error seeding likes"));
    return;
  }
}

async function seedDb() {
  const hasData = await prisma.post.findMany({ take: 1 });
  if (hasData.length === 0) {
    await seedUsers();
    await seedPosts();
    await seedLikes();
  }
  console.log("db should have data");
}

module.exports = seedDb;
