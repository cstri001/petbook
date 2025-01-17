import React, {useState} from "react";
import { FormControl, Stack, TextField, Button } from "@mui/material";

const LoginPage : React.FC = () : React.ReactElement => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  const handleNameChange = (name : string) => {
    setName(name)
  }

  const handleEmailChange = (email : string) => {
    setEmail(email)
  }

  console.log(name)
  return (
    <Stack >
      <TextField 
        id='name'
        label='name'
        placeholder='Nimi'
        onChange={(e) => handleNameChange(e.target.value)}
      />
      
      <TextField 
        id='email'
        label='email'
        placeholder='Sähköposti'
        onChange={(e) => handleEmailChange(e.target.value)}
      />

      <Button onClick={() => window.alert(name)}>Klikkaa</Button>
    </Stack>
    

  )
}

export default LoginPage