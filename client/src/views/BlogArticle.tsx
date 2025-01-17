import { Typography, Stack, Box} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Commentfield from "../components/Commentfield";


// Tämä view on yksittäinen artikkeli tai blogi.

interface Post {
  id: number
  title: string
  body: string
  user: string
  date: string
}

interface Props {
  articleType: string
}

/* OK yritetään muistaa mitä tässä tapahtuu: 
Tämä komponentti/view on siis yksittäistä blogiartikkelin lukemista varten. Tämä näkymä aukeaa, kun "lue lisää" buttonia klikataan jossain
artikkelissa. 

Tässä käytetään PARAMETREJÄ. Ne on niitä osoitteessa olevia juttuja, niinkun vaikka /blog/1, niin toi 1 on siinä se parametri. Se
laitetaan osoitteeseen aina "":id" tyylillä, eli : ja sit se nimi millä sitä haluat kutsua.  
Tässä FRONTIN FILUSSA, joka haluaa kutsua bäkkäriä jollain tietyllä PARAMETRILLÄ; käytetään tota "useParams" - se on Reactin juttu. 
Laita siihen muuttujalle se nimi, millä haluat sitä kutsua (tässä id). eli const {id} = useParams(). 
Näin siitä id:stä tulee ns. parametrimuuttuja. Sitten sitä parametriä voi käyttää siinä fetchiin annettavassa osoitteessa. 

Mitä sitten tapahtuu, määritellään BÄKKÄRIN index.ts. Siellä annetaan PARAMETRIN NIMEÄ KÄYTTÄEN osoite api-routteriin, esim. 
/blog, ja annetaan se halutun routerin käsiin. siellä ROUTERIN SISÄLLÄ TAAS osoitteeseen laitetaan "/:id", jolloin se osoiteparametri
on se, mikä me täältä frontin puolelta laitettiin menemään. Sitten siellä bäkkärillä voidaan tätä käyttää, kun haetaan se req.params.id
nimellä sieltä johonkin muuttujaan. */


const BlogArticle : React.FC<Props> = (props : Props) : React.ReactElement => {

  const [post, setPost] = useState<Post>()
  const { id } = useParams()

  const apiCall = async () : Promise<void> => {
    try {
      const connection = await fetch(`http://localhost:3001/${props.articleType}/${id}`, {method: 'GET'})
      const post : Post | any = await connection.json()
      setPost(post)

    } catch (e : any) {
      console.log('huptit', e)
    }
  }

  useEffect(() => {
    apiCall()
  }, [])

  console.log(post)

  return (
    <Stack>
    {
      post ? (
        <Stack spacing={3}>
          <Box>
            <Typography variant='h3'>
              {post?.title}
            </Typography>
            <Typography variant='body1'>
              {post?.body}
            </Typography>
          </Box>
          <Commentfield />
        </Stack>
      ) : (
        <Typography>Artikkelia ei löytynyt.</Typography>
      )
    }
    </Stack>
  )
}

export default BlogArticle