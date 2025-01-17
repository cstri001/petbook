import React, {useEffect, useState} from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import SinglePost from "./SinglePost";

// Tämä komponentti renderöi postausten previewit etusivulle

export interface BlogPost {
  id: number,
  title: string,
  body: string,
  user: string,
  date: string
}

interface Props {
  articleType: string
}

const BlogPosts : React.FC<Props> = (props : Props) : React.ReactElement => {

  const [posts, setPosts] = useState<BlogPost[]>([])

  const apiCall = async () : Promise<void> => {
    try {
      const connection = await fetch(`http://localhost:3001/${props.articleType}/`, {method: 'GET'})
      const allposts : BlogPost[] = await connection.json()
      setPosts(allposts)
    }
    catch {
      console.log('Jokin meni pieleen kun yritettiin hakea artikkeleita listaukseen.')
    }
  }

  useEffect(() => {
    apiCall()
  }, [])

  return (
    <Stack spacing={3}>
      { posts.length > 0 ? (
        posts.map((post : BlogPost) => {
          return (
            <SinglePost 
              key={post.id} 
              id={post.id}
              title={post.title} 
              body={post.body}
              articleType={props.articleType} 
            />
          )
        })
      ) : (
        <Typography variant='body1'>
          No posts.
        </Typography>
      )}
      <Button>Näytä lisää</Button>
    </Stack>
  )
}

export default BlogPosts