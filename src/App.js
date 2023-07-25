import './App.css';
import React, { useState, createContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import Profiles from "./Components/Profiles/Profiles";
import AddEditProfile from "./Components/Profiles/AddEditProfile";
import ShowSnackBar from "./Components/ResponseSnackBar/ShowSnackBar";

export const SnackBarContext = createContext();

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <>
    <SnackBarContext.Provider
        value={{
          message,
          setMessage,
          severity,
          setSeverity,
          openSnackBar,
          setOpenSnackBar,
        }}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppBar position="static" color={"default"}>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Viral Nation
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "nowrap",
                  alignItems: "center",
                }}
              >
                <LightModeIcon />
                <Switch
                  checked={isDarkMode}
                  color="default"
                  onChange={handleToggleDarkMode}
                  inputProps={{ "aria-label": "toggle dark mode" }}
                />
                <DarkModeIcon />
              </Box>
            </Toolbar>
          </AppBar>

          <Routes>
            <Route path="/" element={<Navigate to="/profiles/my-profiles" />} />
            <Route path="profiles/my-profiles" element={<Profiles />} />
            <Route path="profiles/*">
              <Route path="new" element={<AddEditProfile mode="new" />} />
              <Route path="edit/:id" element={<AddEditProfile mode="edit" />} />
            </Route>
          </Routes>
        <ShowSnackBar
          severity={severity}
          message={message}
          openSnackBar={openSnackBar}
          setOpenSnackBar={setOpenSnackBar}
        />
        </ThemeProvider>
      </SnackBarContext.Provider>
    </>
  );
}

export default App;
