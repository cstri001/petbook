import { PrismaClient } from '@prisma/client';
import express from 'express';


const apiSingleBlogPostRouter : express.Router = express.Router();
const prisma : PrismaClient = new PrismaClient();

apiSingleBlogPostRouter.get('/:id', async (req : express.Request, res : express.Response) => {
  const id = Number(req.params.id)


  res.json(await prisma.blogpost.findFirst({
    where: {
      id: id
    }
  }
  ))
})

export default apiSingleBlogPostRouter
