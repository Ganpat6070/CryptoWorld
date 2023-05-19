import {
  CardContent,
  Card,
  CircularProgress,
  Table,
  TableCell,
  TableRow,
} from "@material-ui/core";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { HistoricalChart } from "../config/api";
import { chartDays } from "../config/data.js";
import { CryptoState } from "../Context";
import MyButton from "./Mybutton";
import "./CoinInfo.css";
import { FaHouseUser, FaReddit, FaGithub } from "react-icons/fa";
import FooterComp from "./Footer";

const CoinInfo = ({ coin, mode }) => {
  const [priceData, setPriceData] = useState([]);
  const [marketCapData, setMarketCapData] = useState([]);
  const [volumeData, setVolumeData] = useState([]);
  const [days, setDays] = useState(1);
  const { currency } = CryptoState();

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setPriceData(data.prices);
    setMarketCapData(data.market_caps);
    setVolumeData(data.total_volumes);
  };

  useEffect(() => {
    fetchHistoricData();
  }, [currency, days]);

  return (
    <>
    <div className="container">
      {!priceData.length || !marketCapData.length || !volumeData.length ? (
        <CircularProgress style={{ color: "gold" }} size={250} thickness={1} />
      ) : (
        <>
          <h2 style={{ color: mode === "dark" ? "#b7acac" : "black" }}>
            Get All the Latest data of the Coin !
          </h2>
          <br />

          <Table>
            <h2 style={{ color: mode === "dark" ? "#b7acac" : "black" }}>
              Scores and Ranks
            </h2>
            <TableRow>
              <TableCell>
                <Card
                  style={{ backgroundColor: mode === "dark" ? "#b7acac" : "" }}
                >
                  <CardContent style={{ textAlign: "center" }}>
                    <h5>Community Score</h5>
                    <p>{coin.community_score}</p>
                  </CardContent>
                </Card>
              </TableCell>
              <TableCell>
                <Card
                  style={{ backgroundColor: mode === "dark" ? "#b7acac" : "" }}
                >
                  <CardContent style={{ textAlign: "center" }}>
                    <h5>CoinGecko Score</h5>
                    <p>{coin.coingecko_score}</p>
                  </CardContent>
                </Card>
              </TableCell>
              <TableCell>
                <Card
                  style={{ backgroundColor: mode === "dark" ? "#b7acac" : "" }}
                >
                  <CardContent style={{ textAlign: "center" }}>
                    <h5>Developer Score</h5>
                    <p>{coin.developer_score}</p>
                  </CardContent>
                </Card>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Card
                  style={{ backgroundColor: mode === "dark" ? "#b7acac" : "" }}
                >
                  <CardContent style={{ textAlign: "center" }}>
                    <h5>Liquidity Score</h5>
                    <p>{coin.liquidity_score}</p>
                  </CardContent>
                </Card>
              </TableCell>
              <TableCell>
                <Card
                  style={{ backgroundColor: mode === "dark" ? "#b7acac" : "" }}
                >
                  <CardContent style={{ textAlign: "center" }}>
                    <h5>Market Cap Rank</h5>
                    <p>{coin.market_cap_rank}</p>
                  </CardContent>
                </Card>
              </TableCell>
              <TableCell>
                <Card
                  style={{ backgroundColor: mode === "dark" ? "#b7acac" : "" }}
                >
                  <CardContent style={{ textAlign: "center" }}>
                    <h5>Coingecko Rank</h5>
                    <p>{coin.coingecko_rank}</p>
                  </CardContent>
                </Card>
              </TableCell>
            </TableRow>
          </Table>
          <br />

          <br />

          <Table>
            <h2 style={{ color: mode === "dark" ? "#b7acac" : "black" }}>
              Market Status
            </h2>
            <TableRow>
              <TableCell>
                <Card
                  style={{ backgroundColor: mode === "dark" ? "#b7acac" : "" }}
                >
                  <CardContent style={{ textAlign: "center" }}>
                    <h5>Circulating Supply</h5>
                    <p>{coin.market_data.circulating_supply}</p>
                  </CardContent>
                </Card>
              </TableCell>
              <TableCell>
                <Card
                  style={{ backgroundColor: mode === "dark" ? "#b7acac" : "" }}
                >
                  <CardContent style={{ textAlign: "center" }}>
                    <h5>Total Supply</h5>
                    <p>{coin.market_data.total_supply}</p>
                  </CardContent>
                </Card>
              </TableCell>
              <TableCell>
                <Card
                  style={{ backgroundColor: mode === "dark" ? "#b7acac" : "" }}
                >
                  <CardContent style={{ textAlign: "center" }}>
                    <h5>Public Interest Score</h5>
                    <p>{coin.public_interest_score}</p>
                  </CardContent>
                </Card>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Card
                  style={{ backgroundColor: mode === "dark" ? "#b7acac" : "" }}
                >
                  <CardContent style={{ textAlign: "center" }}>
                    <h5>Market Cap Change 24h</h5>
                    <p>{coin.market_data.market_cap_change_24h < 0 ? <span style={{color: 'red'}}>{coin.market_data.market_cap_change_24h}</span> : <span style={{color: 'green'}}>{coin.market_data.market_cap_change_24h}</span>}</p>
                  </CardContent>
                </Card>
              </TableCell>
              <TableCell>
                <Card
                  style={{ backgroundColor: mode === "dark" ? "#b7acac" : "" }}
                >
                  <CardContent style={{ textAlign: "center" }}>
                    <h5>Market Cap Change Percentage 24h</h5>
                    <p>{coin.market_data.market_cap_change_percentage_24h < 0 ? <span style={{color: 'red'}}>{coin.market_data.market_cap_change_percentage_24h} %</span> : <span style={{color: 'green'}}>{coin.market_data.market_cap_change_percentage_24h} %</span>}</p>
                  </CardContent>
                </Card>
              </TableCell>
              <TableCell>
                <Card
                  style={{ backgroundColor: mode === "dark" ? "#b7acac" : "" }}
                >
                  <CardContent style={{ textAlign: "center" }}>
                    <h5>Price Change Percentage 14d</h5>
                    <p>{coin.market_data.price_change_percentage_14d < 0 ? <span style={{color: 'red'}}>{coin.market_data.price_change_percentage_14d} %</span> : <span style={{color: 'green'}}>{coin.market_data.price_change_percentage_14d} %</span>}</p>
                  </CardContent>
                </Card>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <Card
                  style={{ backgroundColor: mode === "dark" ? "#b7acac" : "" }}
                >
                  <CardContent style={{ textAlign: "center" }}>
                    <h5>Price Change Percentage 1y</h5>
                    <p>{coin.market_data.price_change_percentage_1y < 0 ? <span style={{color: 'red'}}>{coin.market_data.price_change_percentage_1y} %</span> : <span style={{color: 'green'}}>{coin.market_data.price_change_percentage_1y} %</span>}</p>
                  </CardContent>
                </Card>
              </TableCell>
              <TableCell>
                <Card
                  style={{ backgroundColor: mode === "dark" ? "#b7acac" : "" }}
                >
                  <CardContent style={{ textAlign: "center" }}>
                    <h5>Price Change Percentage 200d</h5>
                    <p>{coin.market_data.price_change_percentage_200d < 0 ? <span style={{color: 'red'}}>{coin.market_data.price_change_percentage_200d} %</span> : <span style={{color: 'green'}}>{coin.market_data.price_change_percentage_200d} %</span> }</p>
                  </CardContent>
                </Card>
              </TableCell>
              <TableCell>
                <Card
                  style={{ backgroundColor: mode === "dark" ? "#b7acac" : "" }}
                >
                  <CardContent style={{ textAlign: "center" }}>
                    <h5>Price Change Percentage 24h</h5>
                    <p>{coin.market_data.price_change_percentage_24h < 0 ? <span style={{color: 'red'}}>{coin.market_data.price_change_percentage_24h} %</span> : <span style={{color: 'green'}}>{coin.market_data.price_change_percentage_24h} %</span>}</p>
                  </CardContent>
                </Card>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Card
                  style={{ backgroundColor: mode === "dark" ? "#b7acac" : "" }}
                >
                  <CardContent style={{ textAlign: "center" }}>
                    <h5>Price Change Percentage 30d</h5>
                    <p>{coin.market_data.price_change_percentage_30d < 0 ? <span style={{color: 'red'}}>{coin.market_data.price_change_percentage_30d} %</span> : <span style={{color: 'green'}}>{coin.market_data.price_change_percentage_30d} %</span>}</p>
                  </CardContent>
                </Card>
              </TableCell>
              <TableCell>
                <Card
                  style={{ backgroundColor: mode === "dark" ? "#b7acac" : "" }}
                >
                  <CardContent style={{ textAlign: "center" }}>
                    <h5>Price Change Percentage 60d</h5>
                    <p>{coin.market_data.price_change_percentage_60d < 0 ? <span style={{color: 'red'}}>{coin.market_data.price_change_percentage_60d} %</span> : <span style={{color: 'green'}}>{coin.market_data.price_change_percentage_60d} %</span>}</p>
                  </CardContent>
                </Card>
              </TableCell>
              <TableCell>
                <Card
                  style={{ backgroundColor: mode === "dark" ? "#b7acac" : "" }}
                >
                  <CardContent style={{ textAlign: "center" }}>
                    <h5>Price Change Percentage 7d</h5>
                    <p>{coin.market_data.price_change_percentage_7d < 0 ? <span style={{color: 'red'}}>{coin.market_data.price_change_percentage_7d} %</span> : <span style={{color: 'green'}}>{coin.market_data.price_change_percentage_7d} %</span>}</p>
                  </CardContent>
                </Card>
              </TableCell>
            </TableRow>
          </Table>
          <br />

          <Table>
            <h2 style={{ color: mode === "dark" ? "#b7acac" : "black" }}>
              Community Status
            </h2>
            <TableRow>
              <TableCell>
                <Card
                  style={{ backgroundColor: mode === "dark" ? "#b7acac" : "" }}
                >
                  <CardContent style={{ textAlign: "center" }}>
                    <h5>Twitter Followers</h5>
                    <p>{coin.community_data.twitter_followers}</p>
                  </CardContent>
                </Card>
              </TableCell>
              <TableCell>
                <Card
                  style={{ backgroundColor: mode === "dark" ? "#b7acac" : "" }}
                >
                  <CardContent style={{ textAlign: "center" }}>
                    <h5>Reddit Average Posts 48h</h5>
                    <p>{coin.community_data.reddit_average_posts_48h}</p>
                  </CardContent>
                </Card>
              </TableCell>
              <TableCell>
                <Card
                  style={{ backgroundColor: mode === "dark" ? "#b7acac" : "" }}
                >
                  <CardContent style={{ textAlign: "center" }}>
                    <h5>Reddit Average Comments 48h</h5>
                    <p>{coin.community_data.reddit_average_comments_48h}</p>
                  </CardContent>
                </Card>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Card
                  style={{ backgroundColor: mode === "dark" ? "#b7acac" : "" }}
                >
                  <CardContent style={{ textAlign: "center" }}>
                    <h5>Reddit Subscribers</h5>
                    <p>{coin.community_data.reddit_subscribers}</p>
                  </CardContent>
                </Card>
              </TableCell>
              <TableCell>
                <Card
                  style={{ backgroundColor: mode === "dark" ? "#b7acac" : "" }}
                >
                  <CardContent style={{ textAlign: "center" }}>
                    <h5>Reddit Accounts Active 48h</h5>
                    <p>{coin.community_data.reddit_accounts_active_48h}</p>
                  </CardContent>
                </Card>
              </TableCell>
            </TableRow>
          </Table>
          <br />

          <Table>
            <h2 style={{ color: mode === "dark" ? "#b7acac" : "black" }}>
              Developer Status
            </h2>
            <TableRow>
              <TableCell>
                <Card
                  style={{ backgroundColor: mode === "dark" ? "#b7acac" : "" }}
                >
                  <CardContent style={{ textAlign: "center" }}>
                    <h5>Forks</h5>
                    <p>{coin.developer_data.forks}</p>
                  </CardContent>
                </Card>
              </TableCell>
              <TableCell>
                <Card
                  style={{ backgroundColor: mode === "dark" ? "#b7acac" : "" }}
                >
                  <CardContent style={{ textAlign: "center" }}>
                    <h5>Stars</h5>
                    <p>{coin.developer_data.stars}</p>
                  </CardContent>
                </Card>
              </TableCell>
              <TableCell>
                <Card
                  style={{ backgroundColor: mode === "dark" ? "#b7acac" : "" }}
                >
                  <CardContent style={{ textAlign: "center" }}>
                    <h5>Subscribers</h5>
                    <p>{coin.developer_data.subscribers}</p>
                  </CardContent>
                </Card>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Card
                  style={{ backgroundColor: mode === "dark" ? "#b7acac" : "" }}
                >
                  <CardContent style={{ textAlign: "center" }}>
                    <h5>Total Issues</h5>
                    <p>{coin.developer_data.total_issues}</p>
                  </CardContent>
                </Card>
              </TableCell>
              <TableCell>
                <Card
                  style={{ backgroundColor: mode === "dark" ? "#b7acac" : "" }}
                >
                  <CardContent style={{ textAlign: "center" }}>
                    <h5>Closed Issues</h5>
                    <p>{coin.developer_data.closed_issues}</p>
                  </CardContent>
                </Card>
              </TableCell>
              <TableCell>
                <Card
                  style={{ backgroundColor: mode === "dark" ? "#b7acac" : "" }}
                >
                  <CardContent style={{ textAlign: "center" }}>
                    <h5>Pull Requests Merged</h5>
                    <p>{coin.developer_data.pull_requests_merged}</p>
                  </CardContent>
                </Card>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Card
                  style={{ backgroundColor: mode === "dark" ? "#b7acac" : "" }}
                >
                  <CardContent style={{ textAlign: "center" }}>
                    <h5>Pull Request Contributors</h5>
                    <p>{coin.developer_data.pull_request_contributors}</p>
                  </CardContent>
                </Card>
              </TableCell>
              <TableCell>
                <Card
                  style={{ backgroundColor: mode === "dark" ? "#b7acac" : "" }}
                >
                  <CardContent style={{ textAlign: "center" }}>
                    <h5>Commit Count 4 weeks</h5>
                    <p>{coin.developer_data.commit_count_4_weeks}</p>
                  </CardContent>
                </Card>
              </TableCell>
            </TableRow>
          </Table>
          <br />

          <br />

          <Table>
            <h2 style={{ color: mode === "dark" ? "#b7acac" : "black" }}>
              Other Status
            </h2>
            <TableRow>
              <TableCell>
                <Card
                  style={{ backgroundColor: mode === "dark" ? "#b7acac" : "" }}
                >
                  <CardContent style={{ textAlign: "center" }}>
                    <h5>Symbol</h5>
                    <p>{coin.symbol}</p>
                  </CardContent>
                </Card>
              </TableCell>
              <TableCell>
                <Card
                  style={{ backgroundColor: mode === "dark" ? "#b7acac" : "" }}
                >
                  <CardContent style={{ textAlign: "center" }}>
                    <h5>hashing_algorithm</h5>
                    <p>{coin.hashing_algorithm}</p>
                  </CardContent>
                </Card>
              </TableCell>
              <TableCell>
                <Card
                  style={{ backgroundColor: mode === "dark" ? "#b7acac" : "" }}
                >
                  <CardContent style={{ textAlign: "center" }}>
                    <h5>Genesis Date</h5>
                    <p>{coin.genesis_date}</p>
                  </CardContent>
                </Card>
              </TableCell>
            </TableRow>
            <TableRow>
            <TableCell>
                <Card
                  style={{ backgroundColor: mode === "dark" ? "#b7acac" : "" }}
                >
                  <CardContent style={{ textAlign: "center" }}>
                    <h5>Homepage</h5>
                    <a href={coin.links.homepage} style={{ fontSize: "100%" }}>
                      <FaHouseUser  style={{fontSize: '25px'}}/>
                    </a>
                  </CardContent>
                </Card>
              </TableCell>
              <TableCell>
                <Card
                  style={{ backgroundColor: mode === "dark" ? "#b7acac" : "" }}
                >
                  <CardContent style={{ textAlign: "center" }}>
                    <h5>Reddit</h5>
                    <a href={coin.links.subreddit_url}><FaReddit  style={{fontSize: '25px'}}/></a>
                  </CardContent>
                </Card>
              </TableCell>
              <TableCell>
                <Card
                  style={{ backgroundColor: mode === "dark" ? "#b7acac" : "" }}
                >
                  <CardContent style={{ textAlign: "center" }}>
                    <h5>Github</h5>
                    <a href={coin.links.repos_url.github[0]}><FaGithub style={{fontSize: '25px'}}/></a>
                  </CardContent>
                </Card>
              </TableCell>

              
            </TableRow>
            <TableRow>
              <TableCell>
                <Card
                  style={{ backgroundColor: mode === "dark" ? "#b7acac" : "" }}
                >
                  <CardContent style={{ textAlign: "center" }}>
                    <h5>Sentiment Votes Up Percentage</h5>
                    <p>{coin.sentiment_votes_up_percentage < 0 ?  <span style={{color: 'red'}}>{coin.sentiment_votes_up_percentage} %</span> : <span style={{color: 'green'}}>{coin.sentiment_votes_up_percentage} %</span>}</p>
                  </CardContent>
                </Card>
              </TableCell>
              <TableCell>
                <Card
                  style={{ backgroundColor: mode === "dark" ? "#b7acac" : "" }}
                >
                  <CardContent style={{ textAlign: "center" }}>
                    <h5>Sentiment Votes Down Percentage</h5>
                    <p>{coin.sentiment_votes_down_percentage < 0 ?  <span style={{color: 'red'}}>{coin.sentiment_votes_down_percentage} %</span> : <span style={{color: 'green'}}>{coin.sentiment_votes_down_percentage} %</span>}</p>
                  </CardContent>
                </Card>
              </TableCell>
              <TableCell>
                <Card
                  style={{ backgroundColor: mode === "dark" ? "#b7acac" : "" }}
                >
                  <CardContent style={{ textAlign: "center" }}>
                    <h5>Liquidity Score</h5>
                    <p>{coin.liquidity_score}</p>
                  </CardContent>
                </Card>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Card
                  style={{ backgroundColor: mode === "dark" ? "#b7acac" : "" }}
                >
                  <CardContent style={{ textAlign: "center" }}>
                    <h5>Total Supply</h5>
                    <p style={{color: "goldenrod"}}>{coin.market_data.total_supply}</p>
                  </CardContent>
                </Card>
              </TableCell>
              <TableCell>
                <Card
                  style={{ backgroundColor: mode === "dark" ? "#b7acac" : "" }}
                >
                  <CardContent style={{ textAlign: "center" }}>
                    <h5>Circulating Supply</h5>
                    <p style={{color: 'goldenrod'}}>{coin.market_data.circulating_supply}</p>
                  </CardContent>
                </Card>
              </TableCell>
              <TableCell>
                <Card
                  style={{ backgroundColor: mode === "dark" ? "#b7acac" : "" }}
                >
                  <CardContent style={{ textAlign: "center" }}>
                    <h5>Last Updated</h5>
                    <p style={{color: '#2eb2ac'}}>{coin.market_data.last_updated}</p>
                  </CardContent>
                </Card>
              </TableCell>
            </TableRow>
          </Table>
          <br />

          <h1 style={{ color: mode === "dark" ? "#b7acac" : "black" }}>
            {coin?.name} in {currency}
          </h1>
          <Line
            data={{
              labels: priceData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),
              datasets: [
                {
                  data: priceData.map((coin) => coin[1]),
                  label: `Price ( Past ${days} Days ) in ${currency}`,
                  borderColor: "#EEBC1D",
                },
              ],
            }}
          />
          <div
            style={{
              display: "flex",
              marginTop: "20px",
              marginBottom: "20px",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            {chartDays.map((day) => (
              <MyButton
                key={day.value}
                onClick={() => setDays(day.value)}
                selected={day.value === days}
              >
                {day.label}
              </MyButton>
            ))}
          </div>
          <br />
          <h2 style={{ color: mode === "dark" ? "#b7acac" : "black" }}>
            Historical Chart of Market Cap
          </h2>
          <br />

          <Line
            data={{
              labels: marketCapData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),
              datasets: [
                {
                  data: marketCapData.map((coin) => coin[1]),
                  label: `Market Cap ( Past ${days} Days ) in ${currency}`,
                  borderColor: "#3F51B5",
                },
              ],
            }}
          />
          <br />
          <h2 style={{ color: mode === "dark" ? "#b7acac" : "black" }}>
            Volume Chart Data
          </h2>
          <br />
          <Line
            data={{
              labels: volumeData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),
              datasets: [
                {
                  data: volumeData.map((coin) => coin[1]),
                  label: `Price ( Past ${days} Days ) in ${currency}`,
                  borderColor: "rgb(40 237 115)",
                },
              ],
            }}
          />
        </>
      )}
     
     <FooterComp />
    </div>
    </>
  );
};

export default CoinInfo;
