import React from "react";
import { Stack, Typography } from "@mui/material";
import BlogPosts from "../components/BlogPosts";

const Home: React.FC = (): React.ReactElement => {
  return (
    <>
      <Stack>
        <Typography variant='h2'>
          Uusimmat blogit
        </Typography>
        <img src='' />
        <BlogPosts articleType='blogposts' />
      </Stack>
      <Stack>
        <Typography variant='h2'>
          Uusimmat artikkelit
        </Typography>
        <img src='' />
        <BlogPosts articleType='articleposts' />
      </Stack>
    </>
  )
}


export default Home