import React, { useEffect, useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import Loader from "../components/Loader";

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified, mode, setMode }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    const response = await fetch(
      `https://bing-news-search1.p.rapidapi.com/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day`,
      {
        headers: {
          "X-BingApis-SDK": "true",
          "X-RapidAPI-Key":
            "70713a4025msh1dcd9db21e79c0dp1cf87fjsn2347c31905e1",
          "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
        },
      }
    );
    const data = await response.json();

    setNewsData(data.value);
    console.log(data.value);
  };

  if (!newsData) return <Loader />;

  return (
    <Row gutter={[24, 24]} style={{ margin: 25 }}>
      {newsData.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card
            hoverable
            className="news-card"
            style={{
              border: "1px solid grey",
              height: "400px",
              marginTop: "3rem",
              backgroundColor: mode === "light" ? "white" : "grey"
            }}
          >
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.name}
                </Title>
                <img
                  src={news?.image?.thumbnail?.contentUrl || demoImage}
                  alt=""
                />
              </div>
              <p>
                {news.description.length > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className="provider-container">
                <div style={{ marginTop: "2%" }}>
                  <Avatar
                    src={
                      news.provider[0]?.image?.thumbnail?.contentUrl ||
                      demoImage
                    }
                    alt=""
                  />
                  <Text className="provider-name" style={{ marginLeft: "3%" }}>
                    {news.provider[0]?.name}
                  </Text>
                </div>
                <Text style={{ marginLeft: "2%" }}>
                  {moment(news.datePublished).startOf("ss").fromNow()}
                </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
