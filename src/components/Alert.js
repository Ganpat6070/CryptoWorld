import { Snackbar } from "@mui/material";
import React, { useState } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { CryptoState } from "../Context";

const Alert = () => {
//   const [open, setOpen] = useState();

  const { alert, setAlert } = CryptoState();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ open: false });
  };

  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={2500}
      onClose={handleClose}
      
    >
      <MuiAlert
        onClose={handleClose}
        elevation={10}
        variant="filled"
        severity={alert.type}
        style={{color: 'white'}}
      >
        {alert.message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;
