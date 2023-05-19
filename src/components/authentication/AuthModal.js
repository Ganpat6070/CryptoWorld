import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
import { AppBar, Tab, Tabs } from "@material-ui/core";
import Login from "./Login";
import SignUp from "./SignUp";
import GoogleButton from "react-google-button";
// import { grey,red } from "@material-ui/core/colors";

import "./AuthModal.css";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { CryptoState } from "../../Context";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // marginLeft: '40px',
  width: 400,
  color: "white",
  borderRadius: "10px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AuthModal() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = useState(0);

  const { setAlert } = CryptoState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setAlert({
          open: true,
          message: 'Sign Up Successful !',
          type: "success",
        });
        handleClose();
      })
      .catch((error) => {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
        return;
      });
  };

  console.log(value);

  return (
    <div>
      <Button
        variant="contained"
        style={{
          width: 85,
          color: "black",
          height: 40,
          marginLeft: 70,
          borderRadius: "10px",
          backgroundColor: "#EEBC1D",
        }}
        onClick={handleOpen}
      >
        Login
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 1000,
          },
        }}
      >
        <Fade in={open}>
          <div>
            <Box sx={style}>
              <AppBar
                position="static"
                style={{ backgroundColor: "transparent", color: "black" }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="fullWidth"
                  style={{ borderRadius: 10 }}
                >
                  <Tab label="Login" />
                  <Tab label="Sign Up" />
                </Tabs>
              </AppBar>

              {value === 0 && <Login handleClose={handleClose} />}
              {value === 1 && <SignUp handleClose={handleClose} />}

              <Box
                style={{
                  padding: 24,
                  paddingTop: 0,
                  display: "flex",
                  color: "black",
                  width: "100%",
                  flexDirection: "column",
                  textAlign: "center",
                  gap: 20,
                  fontSize: 20,
                }}
              >
                <span>OR</span>
                <GoogleButton
                  style={{ width: "100%", outline: "none" }}
                  className="google-button"
                  onClick={signInWithGoogle}
                />
              </Box>
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
