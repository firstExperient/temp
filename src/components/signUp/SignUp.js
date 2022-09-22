import react, { useEffect, useState } from "react";
import server from "../../backEnd";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/user/slice";
import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Fab,
  Stack,
  Divider,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function SignUp() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [family, setFamily] = useState("");
  const [phones, setPhones] = useState([""]);
  const [members, setMembers] = useState([{ name: "", id: "", date: "" }]);
  const changePhone = (index, val) => {
    const p = [...phones];
    p[index] = val;
    setPhones(p);
  };
  const addPhone = () => {
    if (phones.length < 3) setPhones([...phones, ""]);
  };
  const changeMember = (index, key, val) => {
    const mem = [...members];
    mem[index][key] = val;
    setMembers(mem);
  };
  const addMember = () => {
    setMembers([...members, { name: "", id: "", date: "" }]);
  };
  const signUp = () => {
    server({
      cmd: "signUp",
      data: {
        familyName: family,
        members,
        phones,
      },
    }).then((res) => {
      dispatch(setUser(res.data));
      const { route } = location.state;
      navigate(route ? route : "/", { replace: true });
    });
  };
  return (
    <Box className="sign-up-form" pt={7}>
      <Dialog open fullWidth>
        <DialogTitle>רישום למערכת</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              name="name"
              value={family}
              label="שם משפחה"
              type="text"
              onChange={({ target }) => setFamily(target.value)}
            />
            <Divider />
            <Stack spacing={1}>
              {members.map((m, i) => (
                <Member set={changeMember} index={i} key={i} {...m} />
              ))}
            </Stack>
            <Fab sx={{maxWidth:"180px"}} variant="extended" onClick={addMember}>
              הוסף בן משפחה
            </Fab>
            <Divider />
            <Stack spacing={1} direction={{ xs: "column", sm: "row" }}>
              {phones.map((n, i) => (
                <Phone set={changePhone} index={i} key={i} number={n} />
              ))}
            </Stack>
            {phones.length < 3 && (
              <Fab size="small" onClick={addPhone}>
                <AddIcon />
              </Fab>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={signUp}>אישור</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
function Member({ name, id, date, index, set }) {
  const changeHandler = ({ target }) => {
    set(index, target.name, target.value);
  };
  return (
    <Grid className="family-member" container>
      <Grid sm={4} xs={12}>
        <TextField
          name="name"
          value={name}
          label="שם"
          type="text"
          onChange={changeHandler}
        />
      </Grid>
      <Grid sm={4} xs={12}>
        <TextField
          name="id"
          value={id}
          label="תעודת זהות"
          type="number"
          onChange={changeHandler}
        />
      </Grid>
      <Grid sm={4} xs={12}>
        <TextField
          name="date"
          value={date}
          label="תאריך לידה"
          type="date"
          onChange={changeHandler}
          sx={{ width: {md:"100%"} }}
        />
      </Grid>
    </Grid>
  );
}

function Phone({ number, index, set }) {
  const changeHandler = ({ target }) => {
    set(index, target.value);
  };
  let label = "פלאפון  " + (index ? index + 1 : "");
  return (
    <Box className="family-phones" lr={{ display: "flex" }}>
      <TextField
        value={number}
        label={label}
        type="number"
        onChange={changeHandler}
      />
    </Box>
  );
}

function Field({ value, error, label, onChange }) {
  let isError = error ? true : false;
  return (
    <TextField
      value={value}
      label={label}
      error={isError}
      helperText={error}
      onChange={onChange}
    />
  );
}

function Map(obj, set) {
  for (const key in obj) {
    <TextField />;
  }
}
