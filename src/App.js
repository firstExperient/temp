import "./App.css";
import Activities from "./components/activities/Container";
import SignUp from "./components/signUp/SignUp";
import LogIn from "./components/logIn/LogIn";
import ActPage from "./components/activities/ActPage";
import Register from "./components/register/Register";
import SuccessReg from './components/register/Success'
import MainPage from './components/mainPage/Main'
import AppBar from "./components/bars/AppBar";
import ProfileData from "./components/profile/ProfileData";
import { Route, Routes } from "react-router-dom";
//import MenuIcon from '@mui/icons-material/Menu';
import CssBaseline from "@mui/material/CssBaseline";
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box,Container } from "@mui/system";

const theme = createTheme({
  direction: 'rtl', // Both here and <body dir="rtl">
  palette: {
    primary: {
      light: '#6b69c9',
      main: '#373e98',
      dark: '#001869',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff99a4',
      main: '#f16775',
      dark: '#ba354a',
      contrastText: '#000',
    },
  },
  typography:{
    body1:{
      fontSize:"1.3em"
    }
  }
});
// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

function App() {
  return (
    <Box className="App" dir="rtl">
      <CssBaseline />
      <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <AppBar/>
      <Container>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/profile" element={<ProfileData />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/activities/:name" element={<ActPage />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/log-in" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/successful-registration" element={<SuccessReg />} />
      </Routes>
      </Container>
      </ThemeProvider>
    </CacheProvider>
    </Box>
    
  );
}

export default App;
