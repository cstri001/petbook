import express from "express";
import { Prisma, PrismaClient } from "@prisma/client";

const apiArticlePostsRouter : express.Router = express.Router();
const prisma : PrismaClient = new PrismaClient();

apiArticlePostsRouter.get('/', async (req : express.Request, res : express.Response) => {
  res.json(await prisma.article.findMany())
})

export default apiArticlePostsRouter