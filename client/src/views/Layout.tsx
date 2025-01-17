import React, {useState} from "react";
import { Outlet, Link } from "react-router-dom";
import { Typography, Stack, Container, IconButton } from "@mui/material";
import ListIcon from '@mui/icons-material/List';
import MenuDrawer from "../components/MenuDrawer";

const Layout: React.FC = (): React.ReactElement => {

  // Tuo Outlet-komponentti tarkoittaa "Kaikki child-routet tämän routen sisällä näytetään tässä kohtaa", eli tässä tapauksessa "kaikki muut komponentit ja osoitteet" (kts. App.tsx)

    // Tämä kontrolloi sitä, näkyykö MenuDrawer
    const [open, setOpen] = useState(false)

    // Tässä käsitellään MenuDrawer sulkeminen. Tämä välitetään
    // MenuDrawerille propseissa.
    const handleClose = () => {
      setOpen(false);
    } 
  

  return (
    <Container sx={{
      width: '100vw'
    }}>
      <Stack
        direction='row'
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography variant='h1'>
          Petbook
        </Typography>
        <IconButton onClick={() => setOpen(true)}>
          <ListIcon />
        </IconButton>
        <MenuDrawer open={open} onClose={handleClose} />
      </Stack>
      <Outlet />
    </Container>
  )
}

export default Layout