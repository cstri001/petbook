import { PrismaClient } from '@prisma/client';
import express from 'express';


const apiSingleArticlePostRouter : express.Router = express.Router();
const prisma : PrismaClient = new PrismaClient();

apiSingleArticlePostRouter.get('/:id', async (req : express.Request, res : express.Response) => {
  const id = Number(req.params.id)


  res.json(await prisma.article.findFirst({
    where: {
      id: id
    }
  }
  ))
})

export default apiSingleArticlePostRouter
