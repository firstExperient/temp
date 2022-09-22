import react, { useEffect, useState } from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormGroup,
  FormControlLabel,
  Checkbox,
  DialogContentText,
  Button,
  ButtonGroup,
  Badge,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import server from "../../backEnd";

export default function Register() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user);
  const chug = useSelector((state) => state.activities.regData);
  const [reg, setReg] = useState(
    userData.data.members.map((m) => {
      return { reg: false, id: m.id, amount: 0 };
    })
  );
  useEffect(() => {
    if (!userData.isLogged)
      navigate("/log-in", { replace: true, state: { route: "/" } });
    else {
      if (!chug) navigate("/", { replace: true });
    }
  }, []);
  const addReg = ({ target }) => {
    let newReg = [...reg];
    newReg[target.name].reg = target.checked;
    if (target.checked) newReg[target.name].amount = 1;
    setReg(newReg);
  };
  const add = (i) => {
    let newReg = [...reg];
    newReg[i].amount++;
    setReg(newReg);
  };
  const sub = (i) => {
    let newReg = [...reg];
    newReg[i].amount--;
    if (!newReg[i].amount) newReg[i].reg = false;
    setReg(newReg);
  };
  const calculate = () => {
    const { price, add_price } = chug;
    const amount = reg.reduce(
      (pre, cur) => (cur.reg ? pre + cur.amount : pre),
      0
    );
    return [price ? price * amount + " לחודש" : add_price * amount,amount];
  };
  const makeReg = async () => {
    server({ cmd: "makeReg", data: reg }).then(() => {
      navigate("/successful-registration",{replace:true});
    });
  };
  return (
    <Box>
      <Dialog fullWidth open  >
        <DialogTitle>רישום</DialogTitle>
        <DialogContent>
          <FormGroup>
            {userData.data.members.map((m, i) => {
              return (
                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={reg[i].reg}
                        name={i}
                        onClick={addReg}
                      />
                    }
                    label={m.name}
                  />
                  {( Number(chug.get_amount) && reg[i].reg)? (
                    <ButtonGroup color="secondary">
                      <Button onClick={() => add(i)}>+</Button>
                      <Button>{reg[i].amount}</Button>
                      <Button onClick={() => sub(i)}>-</Button>
                    </ButtonGroup>
                  ):""}
                </Box>
              );
            })}
          </FormGroup>
          
          <DialogContentText><Badge
            badgeContent={calculate()[1]}
            color={"primary"}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <ShoppingCartIcon />
          </Badge>  סהכ: {calculate()[0]}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={makeReg}>
            אישור
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
