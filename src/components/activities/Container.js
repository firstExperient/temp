import react, { useEffect, useState } from "react";
import { setActivities,setCatagories } from "../../features/activities/slice";
import { useDispatch, useSelector } from "react-redux";
import Activity from "./Activity";
import Grid from "@mui/material/Unstable_Grid2";
import { Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import server from "../../backEnd";

export default function Container() {
  const dispatch = useDispatch();
  const actList = useSelector((state) => state.activities.list);
  const catagories = useSelector((state) => state.activities.catagories);
  useEffect(() => {
    server({ cmd: "getChugim" })
      .then((res) => {
        dispatch(setActivities(res.data));
      })
      .catch((body) => console.log(body.error));
    server({ cmd: "getCatagories" })
      .then((res) => {
        dispatch(setCatagories(res.data));
      })
      .catch((body) => console.log(body.error));
  }, []);
  const [sort, setSort] = useState("הכל");
  const changeSort = ({ target }) => {
    setSort(target.value);
  };
  return (
    <Box pt={10}>
      <Box mb={3} sx={{ minWidth: 120, maxWidth: 200 }}>
        <FormControl fullWidth>
          <InputLabel>מיין לפי:</InputLabel>
          <Select value={sort} label="מיין לפי" onChange={changeSort}>
            <MenuItem value={"הכל"}>הכל</MenuItem>
            {catagories.map((c)=><MenuItem key={c} value={c}>{c}</MenuItem>)}
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={3} >
        {actList.map((item) => {
            if(sort != 'הכל' && sort != item.commen.thum)return ''
            else return ( <Grid md={4}  xs={12} key={item.name}>
                <Activity {...item} />
              </Grid>)
        }
        )}
      </Grid>
    </Box>
  );
}
