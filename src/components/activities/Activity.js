import react from 'react'
import { Link } from 'react-router-dom';
import { Button,Card,CardActions,CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom'
import image from '../../static/pawel-czerwinski-8uZPynIu-rQ-unsplash.jpg'

export default function Activity({name,commen}){
    const navigate = useNavigate()
    return <Card sx={{ maxWidth: 500,cursor: "pointer",height:"80%" }} onClick={()=>navigate("/activities/"+name)}>
    <CardMedia
      component="img"
      height="140"
      image={image}
      alt="green iguana"
    />
    <CardContent>
    <Typography gutterBottom align='left' variant="caption" component="div">
        {commen.thum}
      </Typography>
      <Typography gutterBottom align='left' variant="h5" component="div">
        {name}
      </Typography>
      <Typography align='left' variant="body2" color="text.secondary">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullam
      </Typography>
    </CardContent>
  </Card>
}

//Photo by <a href="https://unsplash.com/@pawel_czerwinski?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Pawel Czerwinski</a> on <a href="https://unsplash.com/backgrounds/colors/gradient?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  

