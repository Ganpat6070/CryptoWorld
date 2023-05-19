import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { CryptoState } from "../../Context";
import { Avatar } from "@mui/material";
import "./UserSideBar.css";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { numberWithCommas } from "../Carousel";
import { AiFillDelete } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";

export default function UserSideBar({ mode, setMode }) {
  const [state, setState] = React.useState({
    right: false,
  });

  const { user, setAlert, watchlist, coins, symbol } = CryptoState();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const logOut = () => {
    signOut(auth);
    setAlert({
      open: true,
      type: "success",
      message: "Logout Successfull !",
    });

    toggleDrawer();
  };

  const removeFromWatchlist = async (coin) => {
    const coinref = doc(db, "watchlist", user.uid);

    try {
      await setDoc(
        coinref,
        {
          coins: watchlist.filter((watch) => watch !== coin?.id),
        },
        {
          merge: "true",
        }
      );
      setAlert({
        open: true,
        message: `${coin.name} Removed !`,
        type: "warning",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick={toggleDrawer(anchor, true)}
            className="avatarStyle"
            src={user.photoURL}
            alt={user.displayName || user.email}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <div
              className="sidebarContainer"
              style={{ backgroundColor: mode === "light" ? "#fff" : "#333" }}
            >
              <div
                className="sidebarProfile"
                style={{
                  backgroundColor: mode === "light" ? "aliceblue" : "",
                  paddingTop: "3.5rem",
                }}
              >
                <Avatar
                  style={{ height: "200px", width: "200px" }}
                  src={user.photoURL}
                  alt={user.displayName || user.email}
                />
                <span
                  className="sidebarEmailAndName"
                  style={{ color: mode === "light" ? "black" : "white" }}
                >
                  {user.displayName || user.email}
                </span>
                <div
                  className="watchListStyle"
                  style={{
                    backgroundColor: mode === "light" ? "#a5c8c6b0" : "black",
                  }}
                >
                  <span
                    style={{
                      fontSize: 25,
                      textShadow: "black",
                      color: mode === "light" ? "black" : "white",
                      
                    }}
                  >
                    Watchlist
                  </span>
                  <div style={{border: '1px solid black', width: '95%', borderRadius: '8px', marginTop: '1.5rem', padding: '5px'}}> 
                  {coins.map((coin) => {
                    if (watchlist.includes(coin.id)) {
                      return (
                        <div className="coinListStyle">
                          <span
                            style={{
                              color: mode === "light" ? "black" : "white",
                              
                            }}
                          >
                            {coin.name}
                          </span>
                          <span
                            style={{
                              display: "flex",
                              gap: 8,
                              color: mode === "light" ? "black" : "white",
                            }}
                          >
                            {symbol}
                            {numberWithCommas(coin.current_price.toFixed(2))}

                            {/* <img
                              src="https://icons8.com/icon/18964/remove-tag"
                              alt="Remove Tag Icon"
                              style={{ cursor: "pointer" }}
                            /> */}
                            <AiFillDelete
                            className="removeStyle"
                              style={{paddingLeft : "10px"}}
                              fontSize="16"
                              onClick={() => removeFromWatchlist(coin)}
                            />
                          </span>
                        </div>
                      
                      );
                    }
                  })}
                   </div>
                </div>
              </div>
              <Button
                variant="contained"
                className="logoutStyle"
                style={{ backgroundColor: "red", color: "black" }}
                onClick={logOut}
              >
                Log Out
              </Button>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
