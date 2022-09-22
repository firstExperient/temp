import react from 'react'
import {
    Button,
    Box,
    Paper,
    Stack,
    List,
    ListItem,
    Grid,
  } from "@mui/material";

export function Align(props){
    return  <Grid container sx={{justifyContent:"center"}}>
    <Grid xs={12} sm={10} md={8}>{props.children}</Grid></Grid>
}