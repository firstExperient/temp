import react from 'react'
import { useNavigate} from 'react-router-dom'
import { Button,Box,Typography,Dialog } from '@mui/material'
import { Done } from '@mui/icons-material'

export default function(){
    const navigate = useNavigate()
    return <Box>
        <Typography variant='h3'> נרשמת בהצלחה!</Typography>
        <Button variant='contained' onClick={()=>{navigate("/")}} endIcon={<Done/>}>סיום</Button>
    </Box>
}