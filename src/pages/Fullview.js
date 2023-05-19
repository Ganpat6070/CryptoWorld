import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CryptoState } from "../Context";
import { SingleCoin } from "../config/api";
import CoinInfo from "../components/CoinInfo";
import { Button, LinearProgress, Typography } from "@material-ui/core";

import ReactHtmlParser from "react-html-parser";

import "../components/Fullview.css";
import { numberWithCommas } from "../components/Carousel";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const Fullview = ({mode, setMode}) => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol, user, watchlist, setAlert } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  console.log(coin);

  useEffect(() => {
    fetchCoin();
  }, []);

  const inWatchlist = watchlist.includes(coin?.id);

  const addToWatchlist = async() => {
    const coinref = doc(db,"watchlist",user.uid)

    try {
      await setDoc(coinref, {
        coins: watchlist?[...watchlist, coin?.id]:[coin?.id]
      })
      setAlert({
        open: true,
        message: `${coin.name} Added !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  }

  const removeFromWatchlist = async() => {
    const coinref = doc(db,"watchlist",user.uid)

    try {
      await setDoc(coinref, {
        coins: watchlist.filter((watch)=>watch!==coin?.id), 
      },{
        merge: "true",
      })
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
  }

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <>
      <div className="sideContainer"  style={{backgroundColor: mode==='dark' ? '#b7acac' : 'aliceblue', borderRadius: '10px'}}>
        <div className="coindata">
          <img
            src={coin?.image.large}
            alt={coin?.name}
            height="200"
            style={{ marginBottom: 20 }}
          />
          <Typography variant="h3" className="coinHeading">
            {coin?.name}
          </Typography>
          <Typography variant="subtitle1" className="descriptionStyle">
            {/* {ReactHtmlParser(coin?.description.en.split(". ")[0])}. */}
            {ReactHtmlParser(coin?.description.en)}.
          </Typography>
          <div className="marketData">
            <br />
            <span style={{ display: "flex" }}>
              <Typography variant="h5" className="">
                {" "}
                Rank :{" "}
              </Typography>
              &nbsp; &nbsp;
              <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
                {coin?.market_cap_rank}
              </Typography>
            </span>

            <span style={{ display: "flex" }}>
              <Typography variant="h5" className="">
                {" "}
                Current Price :{" "}
              </Typography>
              &nbsp; &nbsp;
              <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
                {symbol}{" "}
                {numberWithCommas(
                  coin?.market_data.current_price[currency.toLowerCase()]
                )}
              </Typography>
            </span>
            <span style={{ display: "flex" }}>
              <Typography variant="h5" className="">
                {" "}
                Market Cap :{" "}
              </Typography>
              &nbsp; &nbsp;
              <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
                {symbol}{" "}
                {numberWithCommas(
                  coin?.market_data.market_cap[currency.toLowerCase()]
                    .toString()
                    .slice(0, -6)
                )}
                M
              </Typography>
            </span>
            {user && (
              <Button
                variant="outlined"
                style={{
                  width: "100%",
                  height: 40,
                  backgroundColor: inWatchlist ? "#ff0000" : "#EEBC1D",
                }}
                onClick={ inWatchlist? removeFromWatchlist : addToWatchlist}
              >
                { inWatchlist ? "Remove": "Add to Watchlist" }
              </Button>
            )}
          </div>
        </div>
      </div>
      <CoinInfo coin={coin} mode={mode} setMode = {setMode}/>
    </>
  );
};

export default Fullview;
