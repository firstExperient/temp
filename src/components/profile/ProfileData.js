import react, { useEffect } from "react";
import { useSelector } from "react-redux";
import FaceIcon from '@mui/icons-material/Face';
import PhoneIcon from '@mui/icons-material/Phone';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  List,
  ListSubheader,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider
} from "@mui/material";
import { Align } from "../helpers";
import { useNavigate } from "react-router-dom";

export default function () {
  const userData = useSelector((state) => state.user.data);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userData.name) navigate("/");
  });
  return (
    <Box pt={5}>
        <Align>
      <Card >
        <CardContent>
          <Typography variant="h5">פרופיל</Typography>
          <Typography color="text.secondary">{userData.name}</Typography>
          <Grid container pt={3}>
            <Grid sm={6} xs={12} >
              <List>
              <ListSubheader><Typography variant="h6" align="left">בני משפחה:</Typography></ListSubheader>
                {userData.members.map((m) => (
                  <ListItem key={m.id} disablePadding>
                    <ListItemButton>
                      <ListItemIcon><FaceIcon/></ListItemIcon>
                      <ListItemText primary={m.name} secondary={m.id} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              
            </Grid>
            {/* <Grid md={1}><Divider orientation="vertical"/></Grid> */}
            <Grid sm={5}>
            <List>
              <ListSubheader><Typography align="left" variant="h6">מספרי טלפון:</Typography></ListSubheader>
              {userData.phones.map((p) => (
                <ListItem key={p.number} disablePadding>
                  <ListItemButton>
                    <ListItemIcon><PhoneIcon/></ListItemIcon>
                    <ListItemText primary={p.number} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      </Align>
    </Box>
  );
}
