import React from 'react';
import { makeStyles } from '@mui/styles';
import { Container, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, LinkedIn, GitHub } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[900],
    color: theme.palette.common.white,
    padding: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(6),
    },
  },
  socialIcon: {
    color: theme.palette.common.white,
    marginRight: theme.spacing(1),
    '&:hover': {
      color: '#3b5998', // Facebook blue
    },
  },
  link: {
    color: theme.palette.common.white,
    '&:hover': {
      color: theme.palette.primary.light,
    },
  },
}));

function FooterComp() {
  const classes = useStyles();

  return (
    <footer className={classes.root}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          Crypto World <span style={{color: 'gold'}}>&copy;</span> 2023
        </Typography>
        <Typography variant="subtitle1" align="center" component="p">
          Crypto World is a website that displays live data and information about cryptocurrencies. Our platform provides up-to-date market prices, trends, news, and analysis to help you make informed investment decisions.
        </Typography>
        <br />
        <Typography variant="body2" align="center">
          Follow us on social media <br />
          <IconButton aria-label="Facebook" className={classes.socialIcon}>
            <Facebook style={{ color: 'gold' }} onClick={() => window.location.href='https://www.facebook.com'} />
          </IconButton>
          <IconButton aria-label="Twitter" className={classes.socialIcon}>
            <Twitter style={{ color: 'gold' }} onClick={() => window.location.href='https://twitter.com'}/>
          </IconButton>
          <IconButton aria-label="LinkedIn" className={classes.socialIcon} onClick={() => window.location.href='https://www.linkedin.com'} >
            <LinkedIn style={{ color: 'gold' }} />
          </IconButton>
          <IconButton aria-label="GitHub" className={classes.socialIcon} onClick={() => window.location.href='https://github.com'}>
            <GitHub style={{ color: 'gold' }} />
          </IconButton>
        </Typography><br />
      </Container>
    </footer>
  );
}

export default FooterComp;
