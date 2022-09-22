import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Box,
  Typography,
  Avatar,
  Menu,MenuItem
} from "@mui/material";
import React, { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../features/user/slice";
export default function Bar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogged = useSelector((state) => state.user.isLogged);
  const userName = useSelector((state) => state.user.data.name)
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log(userName)
  return (
    <Box>
      <AppBar position="static">
        {isLogged ? (
          <Toolbar>
            <Typography variant="h6" align="left" component="div" sx={{ flexGrow: 1 }}>
            מנהל קהילתי נווה יעקב
          </Typography>
            <Button color="inherit" onClick={()=>dispatch(logOut())}>יציאה</Button>
            <Button color="inherit" onClick={()=>navigate("/activities")}>פעילויות</Button>
            <Avatar size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit">{userName[0]}</Avatar>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={()=>{handleClose();navigate("/profile")}}>פרופיל</MenuItem>
                <MenuItem onClick={handleClose}>ניהול החשבון</MenuItem>
              </Menu>
          </Toolbar>
        ) : (
          <Toolbar>
            <Typography variant="h6" align="left" component="div" sx={{ flexGrow: 1 }}>
            מנהל קהילתי נווה יעקב
          </Typography>
            <Button color="inherit" onClick={()=>navigate("/log-in")}>הכנס</Button>
            <Button color="inherit" onClick={()=>navigate("/activities")}>פעילויות</Button>
            
          </Toolbar>
        )}
      </AppBar>
    </Box>
  );
}
