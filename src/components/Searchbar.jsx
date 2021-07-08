import React, { useState, useContext } from "react";
import { Input, Space } from "antd";
import { ContextContext } from "./context";
import { Row, Col } from "antd";
import { Card } from "antd";
import { Link } from "react-router-dom";
const { Meta } = Card;

const { Search } = Input;

const baseapiUrl =
  "https://api.themoviedb.org/3/search/multi?api_key=70ce45fdad1824ccc3dad6c68ef34779";

export default function Searchmovie() {
  const { setValue } = useContext(ContextContext);
  const [folan, setFolan] = useState([]);
  const [loading, setLoading] = useState(true);

  const onSearch = (value) => {
    fetch(`${baseapiUrl}&query=${value}&page=1&language=en-US`)
      .then((result) => result.json())
      .then((data) => {
        setFolan([...data.results]);
        setLoading(false);
        setValue(false);
      });
  };
  console.log(folan);
  return (
    <div>
      <Space direction="vertical">
        <Search
          placeholder="search"
          onSearch={onSearch}
          style={{ width: 200 }}
        />
      </Space>

      <Row>
        {folan.map((b) => (
          <>
            <Col xs={24} sm={12} md={8} xl={6}>
              <Link to={`/${b.id}`}>
                {" "}
                <Card
                  loading={loading}
                  hoverable
                  style={{ width: 240 }}
                  cover={
                    <img
                      alt="example"
                      src={
                        `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${
                          b.profile_path || b.poster_path
                        }` || `https://image.tmdb.org/t/p/w500${b.poster_path}`
                      }
                    />
                  }
                >
                  <p>{b.title}</p>{" "}
                  <Meta title={b.original_title} description={b.overview} />
                </Card>
              </Link>
            </Col>
          </>
        ))}
      </Row>
    </div>
  );
}
