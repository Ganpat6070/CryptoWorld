import React from "react";
import {
  AppBar,
  Container,
  Toolbar,
  Select,
  MenuItem,
  Switch,
} from "@mui/material";
import { Link } from "react-router-dom";

import "./Header.css";
import { CryptoState } from "../Context";
import AuthModal from "./authentication/AuthModal";
import { FaHome } from "react-icons/fa";
import UserSideBar from "./authentication/UserSideBar";

const Header = ({ mode, setMode }) => {
  const { currency, setCurrency, user } = CryptoState();
  console.log(currency);

  return (
    <AppBar color="grey" position="static" style={{ background: "#14161A" }}>
      <Container>
        <Toolbar>
          <div className="navContent">
            <h1 className="title">
              <Link to="/">
                <FaHome />
              </Link>
            </h1>
          </div>
          <div className="navLinks">
            <Link to="/news">News</Link>
          </div>
          <Select
            variant="outlined"
            style={{
              width: "120px",
              height: "45px",
              marginLeft: "700px",
              marginRight: "50px",
              textAlign: "center",
              padding: "0px",
              color: "gold",
              border: "1px solid gold",
              borderRadius: "15px",
            }}
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            
          >
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="INR">INR</MenuItem>
          </Select>
          <Switch style={{color: 'gold'}}
            onChange={() => setMode(mode === "light" ? "dark" : "light")}
          />
          {user ? <UserSideBar mode={mode} setMode={setMode} /> : <AuthModal />}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
