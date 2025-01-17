import express from "express";
import { PrismaClient } from "@prisma/client";


const prisma : PrismaClient = new PrismaClient()
const apiBlogPostsRouter : express.Router = express.Router()

apiBlogPostsRouter.get('/', async (req : express.Request, res : express.Response) => {
  res.json(await prisma.blogpost.findMany())
})

export default apiBlogPostsRouter