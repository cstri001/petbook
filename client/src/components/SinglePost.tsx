import React, { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Button, Card, CardContent, CardActions, CardMedia } from "@mui/material";

interface Props {
  id: number
  title: string
  body: string
  articleType: string
}

// Tämä komponentti on postauksen "preview", joka näkyy etusivulla

const SinglePost: React.FC<Props> = (props: Props): React.ReactElement => {
  // Tätä käytetään siihen, että saadaan linkkibuttonin osoite osoittamaan oikeaan paikkaan (osoitetta käytetään App.tsx routeissa)
  const address = props.articleType === 'articleposts' ? 'article' : 'blog'

  // Tämä lyhentää artikkelin tekstin ja lisää pisteet perään.
  const truncatedText = (props.body).length > 100 ? `${(props.body).substring(0, 100)}...` : props.body

  return (
    <Card sx={{ display: 'flex' }}>
      <CardMedia component='img'
        sx={{width: 100}}
        src='http://localhost:3001/images/1.jpg'
      />
      <CardContent>
        <Typography variant="h3">
          {props.title}
        </Typography>
        <Typography variant="body1">
          {truncatedText}
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/${address}/${props.id}`}><Button>Lue lisää</Button></Link>
      </CardActions>
    </Card>
  )
}

export default SinglePost