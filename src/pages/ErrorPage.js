import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {Button} from '@mui/material';
import Footer from "../components/Footer";
import FooterComp from "../components/Footer";

const useStyles = makeStyles((theme) => ({
  page_404: {
    padding: "0",
    background: "#fff",
    margin: "0px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  four_zero_four_bg: {
    backgroundImage:
      "url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)",
    height: "400px",
    backgroundPosition: "center"
  }
}));

function ErrorPage() {
  const classes = useStyles();

  return (
    <>
    <section className={classes.page_404}>
      <Container>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <div className={classes.four_zero_four_bg}>
              <Typography variant="h1" align="center" style={{ fontSize: "80px" }}>
                404
              </Typography>
            </div>
            <div style={{ marginTop: "-50px" }}>
              <Typography variant="h3" align="center">
                Look like you're lost
              </Typography>
              <Typography variant="body1" align="center">
                the page you are looking for not avaible!
              </Typography>
              <Link to="/" style={{ display: "block", textAlign: "center" }}>
                Go to Home
              </Link>
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
      <FooterComp />
      </>
  );
}

export default ErrorPage;
