import { Divider, TextField, Typography, Box, Button, Stack, ListItem, List, ListItemText } from "@mui/material";
import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";

interface Comment {
  articleId: number
  username: string
  comment: string
  date: string
}

const Commentfield : React.FC = () : React.ReactElement => {

  // Tämä sisältää kaikki kommentit tietokannasta
  const [comments, setComments] = useState<Comment[]>([])
  // Tämä on uusi kommentti, jonka käyttäjä kirjoittaa
  const [comment, setComment] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  // Tämä on defaulttina true, ettei error-viesti näy heti kun sivu latautuu
  const [isComment, setIsComment] = useState<boolean>(true)
  const [isUsername, setIsUsername] = useState<boolean>(true)

  const {id} = useParams()

  // Tätä apiCallia voi käyttää GET tai POST-metodilla
  const apiCall = async (method : string, comment? : Comment) : Promise<void> => {
    try {

      if (method === 'GET') {
        const connection = await fetch(`http://localhost:3001/api/blog/comments/${id}`, {method: method})
        const allComments : Comment[] = await connection.json()
        setComments(allComments)
      }

      if (method === 'POST') {
        // Tähän POSTiin tarvitaan toi "headers"-tyyppi
        const connection = await fetch(`http://localhost:3001/api/blog/comments/${id}`, {method: method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            comment
          )}
        )
      }
    } catch (e) {
      console.log(`Kommenttien haussa tapahtui virhe`, e)
    }
  }

  const handleCommentChange = (comment : string) => {
    setComment(comment)
    setIsComment(true)
  }

  const handleUsernameChange = (username : string) => {
    setUsername(username)
    setIsUsername(true)
  }

  // If comment or username is empty, set the corresponding state to false. Otherwise, add the comment to the database
  const checkCommentValidity = (comment : string, username : string) => {
    
    if (comment && username) {
      setIsComment(true)
      setIsUsername(true)
      addComment(comment, username)
      return
    }
  
    if (!comment) {
      setIsComment(false)
    }

    if (!username) {
      setIsUsername(false)
    }

    return

  }

  const addComment = (comment : string, username : string) => {

    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const newComment = {
      articleId: Number(id),
      username:  username,
      comment: comment,
      date: `${day}.${month}.${year}`
    }

    const updatedComments = [...comments, newComment]
    setComments(updatedComments);
    apiCall('POST', newComment)
    
  }

  useEffect(() => {
    apiCall('GET')
  }, [])


  return (
    <Box>
      <List>
        {
          comments.length > 0 ? (
            comments.map((comment : Comment, idx : number) => {
              return (
                <Box key={idx}>
                  <ListItem>
                    <ListItemText primary={comment.comment} secondary={`${comment.username} - ${comment.date}`} />
                  </ListItem>
                  <Divider />
                </Box>
              )
            })
          ) : (
            <Typography variant="body2">
              Ei kommentteja.
            </Typography>
          )
        }
      </List>
      <Stack spacing={3}>

        <Typography variant='h4'>
          Kommentoi
        </Typography>
        <>
          {
            isComment ? (
              <></>
              ) : (
              <Typography variant='body1' color='error'>
              Kommentti ei voi olla tyhjä.
              </Typography>
            )
          }        
        </>
        <>
          {
            isUsername ? (
              <></>
              ) : (
              <Typography variant='body1' color='error'>
              Nimimerkki ei voi olla tyhjä.
              </Typography>
            )
          }        
        </>
        <TextField
          label='Kommentti'
          multiline
          rows={6}
          fullWidth
          onChange={(e) => handleCommentChange(e.target.value)}
          required={true}
        />
        <Box>
          <TextField
            label='Nimimerkki'
            onChange={(e) => handleUsernameChange(e.target.value)}
            required={true}
          />
          <Button onClick={() => checkCommentValidity(comment, username)}>Lähetä kommentti</Button>
        </Box>
      </Stack>
    </Box>
  )
}

export default Commentfield