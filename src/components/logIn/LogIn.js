import react, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import server from "../../backEnd";
import { setUser } from "../../features/user/slice";
import { useDispatch } from "react-redux";
import {
  Button,
  TextField,
  Box,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Stack
} from "@mui/material";

export default function LogIn(props) {
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [phone, setPhone] = useState("");
  const [error,setError] = useState({phone:"",id:""})
  const location = useLocation();
  const [route] = useState(location.state ? location.state.route ? location.state.route:"/":"/")
  const navigate = useNavigate();
  const logIn = async () => {
    console.log(location);
    server({ id, phone, cmd: "logIn" })
      .then((res) => {
        dispatch(setUser(res.data));
        navigate(route,{replace: true});
      })
      .catch((body) => console.log(body.error));
    //fetch
  };

  return (
    <Box className="log-in-form">
      <Dialog open>
        <DialogTitle>כניסה למערכת</DialogTitle>
        <DialogContent>
          <DialogContentText>
            עוד לא נרשמת?{" "}
            <Link to={"/sign-up"} state={{ route}}>
              הרשם פה
            </Link>
          </DialogContentText>
          <Stack spacing={1}>
          <Field
            error={error.phone}
            value={phone}
            label="טלפון"
            onChange={({ target }) => setPhone(target.value)}
          />
          <Field
            value={id}
            error={error.id}
            label="תעודת זהות"
            onChange={({ target }) => setId(target.value)}
          />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={logIn}>
            הכנס
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

function Field({value,error,label,onChange}){
  let isError = error? true: false
  return <TextField type="number" fullWidth value={value} label={label} error={isError} helperText={error} onChange={onChange}/>
}
