import React from "react";
import { Box, List, Drawer, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

interface Props {
  open: boolean
  onClose: () => void
}

const MenuDrawer: React.FC<Props> = (props : Props) : React.ReactElement => {
  return (
    <Drawer open={props.open} onClose={props.onClose}>
      <Box sx={{width: 250}}>
        <List>
          <ListItem>
            <ListItemButton>
              <ListItemText>
                <Link to='/'>Etusivu</Link>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemText>
                <Link to='login'>Kirjaudu sisään</Link>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  )
}

export default MenuDrawer