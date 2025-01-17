import express from 'express';
import { PrismaClient } from '@prisma/client';

const apiCommentsRouter : express.Router = express.Router()

const prisma : PrismaClient = new PrismaClient()

apiCommentsRouter.get('/blog/comments/:id', async (req : express.Request, res : express.Response) => {
  
  const id : number = Number(req.params.id)
  try {
    res.json(await prisma.comment.findMany({
      where: {
        articleId: id
      }
    }))
  } catch (e) {
    console.log(`Kommenttien haussa palvelinvirhe`, e)
  }
})

apiCommentsRouter.post('/blog/comments/:id', async (req : express.Request, res : express.Response) => {
  const id : number = Number(req.params.id)
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  try {
    res.json(await prisma.comment.create({
      data: {
        articleId: id,
        username: req.body.username,
        comment: req.body.comment,
        date: `${day}.${month}.${year}`
      }

    }))
  }
  catch (e) {
    console.log(`Kommentin lisäyksessä tapahtui virhe`, e)
  }
})

export default apiCommentsRouter