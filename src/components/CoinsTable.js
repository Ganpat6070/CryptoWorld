import React, { useState, useEffect } from "react";
// import axios from "axios";
import "./CoinsTable.css";
// import { CoinList } from "../config/api";
import { CryptoState } from "../Context";
import { useNavigate } from "react-router-dom";
import { Container, createTheme, ThemeProvider } from "@mui/system";

import {
  Table,
  TableContainer,
  TextField,
  Typography,
  LinearProgress,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  // TablePagination,
  Button,
} from "@material-ui/core";
import { numberWithCommas } from "./Carousel";

import './CoinsTable.css';
import FooterComp from "./Footer";

const CoinsTable = () => {
  
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const { currency, symbol, coins, loading, fetchCoins } = CryptoState();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });


  console.log(coins);

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  // const handleChangePage = (newPage) => {
  //   setPage(2);
  // };

  // const handleChangeRowsPerPage = () => {
  //   // setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(page);
  // };

  // const handlePagination = (event) => {
  //   setPage(event.target.value);
  // }

  return (
    <>
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center", color: 'goldenrod' }}>
        <Typography style={{ margin: 18, fontFamily: "Montserrat", fontWeight: "bold" }}>
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search your Crypto.."
          className="searchBar"
          variant="outlined"
          style={{ marginBottom: 20, width: "80%", color: 'goldenrod !important' }}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "gold" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow 
                        onClick={() => navigate(`/coins/${row.id}`)}
                        className="tablerow"
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                            color: 'goldenrod'
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span>{row.name}</span>
                          </div>
                        </TableCell>
                        <TableCell align="right" style={{color: '#5996aa', fontWeight: 'bold'}}>
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right" style={{color: '#5996aa', fontWeight: 'bold'}}>
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)
                          )}
                          <span style={{fontSize: '1rem'}}>&nbsp;M</span>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        

        {/* <TablePagination
          count={(handleSearch()?.length / 10).toFixed(0)}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          page={page}
          onChange={(e) => {
            console.log(e.target.value + 1);
            setPage(e.target.value + 1);
          }}
        /> */}
        
        <Button
          style={{
            padding: '10px',
            margin: '10px 80px',
            backgroundColor: 'black',
            color: 'gold',
            width: "30%",
            display: "inline-block",
            justifyContent: "space-between",
            borderRadius: '10px'
          }}
          onClick={() => {
            if(page === 1){

            }else{
            setPage(page - 1);
            }
          }}
        >
          &lt; &lt; &nbsp; Previous 
        </Button>
        
        <Button
          style={{
            padding: '10px',
            margin: '10px 80px',
            width: "30%",
            display: "inline-block",
            color: 'gold',
            justifyContent: "space-between",
            backgroundColor: 'black',
            borderRadius: '10px'

          }}
          onClick={() => {
            if(page === 10){

            }else{
            setPage(page + 1);
            }
          }}
        >
          Next &nbsp; &gt; &gt;
        </Button>
      </Container>
    </ThemeProvider>
      <FooterComp />
      </>
  );
};

export default CoinsTable;
