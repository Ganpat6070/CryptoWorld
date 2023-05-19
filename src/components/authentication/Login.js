import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { auth } from "../../firebase";
import { CryptoState } from "../../Context";
import { signInWithEmailAndPassword } from "firebase/auth";
import './AuthModal.css';

const Login = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAlert } = CryptoState();

  const handleSubmitLogin = async () => {
    if (!email || !password) {
      setAlert({
        open: true,
        message: "Email / Password should not be empty",
        type: "error",
      });
      return;
    }
    try {
      // const result = await signInWithEmailAndPassword(auth, email, password)
      setAlert({
        open: true,
        message: "Login Successful",
        type: "success",
      });
      console.log('logged in succesfully');

      handleClose();
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
      console.log('NOt valid');

      return;
    }
  };

  return (
    <Box
      p={3}
      // className='loginStyle'
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        color: 'black'
      }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        label="Enter Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />

      <Button
        variant="contained"
        size="large"
        // style={{ backgroundColor: "#EEBC1D" }}
                style={{ backgroundColor: "#EEBC1D", color: 'black' }}
        onClick={handleSubmitLogin}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
