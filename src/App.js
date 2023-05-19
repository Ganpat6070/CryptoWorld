import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import Fullview from "./pages/Fullview";

import "./App.css";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
// import white from '@material-ui/core/colors/deepOrange'
import News from "./pages/News";
import Alert from "./components/Alert";
import ErrorPage from "./pages/ErrorPage";

export const darkTheme = createTheme({
  palette: {
    type: "dark",
    background: {
      default: "hsl(230, 17%, 14%)",
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    type: "light",
    background: {
      default: "hsl(0, 0%, 100%)",
    },
  },
});

function App() {
  const [mode, setMode] = useState("light");
  const selectedTheme = mode === "dark" ? darkTheme : lightTheme;

  return (
    <>
      {" "}
      <ThemeProvider theme={selectedTheme}>
        <CssBaseline />
        <BrowserRouter>
          <div>
            <Header mode={mode} setMode={setMode} />
            <Routes>
              <Route path="/" element={<Homepage />} exact></Route>
              <Route
                path="/coins/:id"
                element={<Fullview mode={mode} setMode={setMode} />}
                exact
              ></Route>
              <Route
                path="/news"
                element={<News mode={mode} setMode={setMode} />}
                exact
              />
              <Route path="/*" element={<ErrorPage />} exact />
            </Routes>
          </div>
          <Alert />
        </BrowserRouter>
         
      </ThemeProvider>
      
    </>
  );
}

export default App;
