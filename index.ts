import express from 'express';
import path from 'path';
import apiBlogPostsRouter from './routes/apiBlogPosts';
import cors from 'cors'
import apiArticlePostsRouter from './routes/apiArticlePosts';
import apiSingleBlogPostRouter from './routes/apiSingleBlogPost';
import apiSingleArticlePostRouter from './routes/apiSingleArticlePost';
import apiCommentsRouter from './routes/apiComments';


const app : express.Application = express();

const port : number = Number(process.env.PORT) | 3001;
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'public')))
app.use('/images', express.static(path.resolve(__dirname, '/public/images')))
app.use(cors({origin: 'http://localhost:3000'}))

app.use('/blogposts/', apiBlogPostsRouter)
app.use('/articleposts', apiArticlePostsRouter)
app.use('/blog', apiSingleBlogPostRouter)
app.use('/article', apiSingleArticlePostRouter)
app.use('/api/', apiCommentsRouter)


app.listen(port, () => {
  console.log(`Palvelin käynnistyi porttiin ${port}.`)
})
