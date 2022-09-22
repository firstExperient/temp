import react, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Box, Paper, Stack, List, ListItem,Typography,Divider } from "@mui/material";
import { setRegData } from "../../features/activities/slice";
import { useDispatch } from "react-redux";
import { Align } from "../helpers";

export default function ActPage() {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const isLogged = useSelector((state) => state.user.isLogged);
  let data = useSelector(
    (state) =>
      state.activities.list.filter(({ name }) => name == params.name)[0]
  );
  const register = (child) => {
    if (!isLogged)
      navigate("/log-in", { state: { route: "/activities/" + params.name } });
    else {
      dispatch(setRegData({ ...data.commen, ...data.children[child] }));
      navigate("/register");
    }
  };
  return (
    <Align>
      <Box pt={7} pb={7}>
        <Paper p={2}>
            <Typography variant="h4" pt={2}>{data.name}</Typography>
          <Data e={data.commen} />
          {data.children.length == 1 && (
            <Button variant="outlined" onClick={() => register(0)} size="small">
              לרישום
            </Button>
          )}
          <Stack spacing={3} pt={2} m={2} pb={2}>
            {data.children.length > 1 &&
              data.children.map((e, i) => (
                <Box>
                    <Divider/>
                  <Data e={e} />
                  <Button  variant="outlined" onClick={() => register(i)} size="small">
                    לרישום
                  </Button>
                  </Box>
              ))}
          </Stack>
        </Paper>
      </Box>
    </Align>
  );
}

function Data({ e }) {
  return (
    <Typography variant="body1">
    <List>
      {e.place && <ListItem>מיקום: {e.place}</ListItem>}
      {e.gil && <ListItem>גיל: {e.gil}</ListItem>}
      {e.day && <ListItem>יום: {e.day}</ListItem>}
      {e.time && <ListItem>שעה: {e.time}</ListItem>}
      {e.price ? <ListItem>מחיר לחודש: {e.price}</ListItem> : ""}
      {e.add_price ? <ListItem>עלות: {e.add_price}</ListItem> : ""}
    </List>
    </Typography>
  );
}
