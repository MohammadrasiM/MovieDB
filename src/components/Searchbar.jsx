import React, { useState, useContext } from "react";
import { Spin, Row, Col, Input, Space } from "antd";
import { ContextContext } from "./context";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { Pagination } from "antd";

const { Search } = Input;
const { Meta } = Card;

export default function Searchbar() {
  const { value, setValue } = useContext(ContextContext);
  const [searchepage, setSearchpage] = useState();
  const [folan, setFolan] = useState({});
  const [loading, setLoading] = useState(true);

  const baseapiUrl =
    "https://api.themoviedb.org/3/search/multi?api_key=70ce45fdad1824ccc3dad6c68ef34779";

  React.useEffect(() => {
    if (value) {
      fetch(`${baseapiUrl}&query=${value}&page=1&language=en-US`)
        .then((result) => result.json())
        .then((data) => {
          setFolan(data);
          setLoading(false);
          setSearchpage(value);
        });
    }
  }, [value]);

  function fetchMoivez(page) {
    fetch(`${baseapiUrl}&query=${value}&page=${page}&language=en-US`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFolan(data);
        setLoading(false);
      });
  }
  React.useEffect(() => {
    if (value) fetchMoivez(1);
  }, [value]);

  return (
    <div>
      <Spin spinning={loading}>
        {" "}
        <Row gutter={100}>
          {folan?.results?.map((b) => (
            <Col key={b.id} xs={24} sm={12} md={8} xl={6}>
              {b.poster_path ? (
                <Link to={`/Moviedetail/${b.id}`}>
                  {" "}
                  <Card
                    style={{ overflow: "hidden", height: 500 }}
                    loading={loading}
                    hoverable
                    cover={
                      <img
                        alt={b.original_title}
                        src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${
                          b.profile_path || b.poster_path
                        }`}
                      />
                    }
                  >
                    <Meta title={b.original_title} description={b.overview} />
                  </Card>
                </Link>
              ) : (
                <Link to={`/cast/${b.id}`}>
                  {" "}
                  <Card
                    style={{ overflow: "hidden", height: 500 }}
                    loading={loading}
                    hoverable
                    cover={
                      <img
                        alt={b.original_title}
                        src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${
                          b.profile_path || b.poster_path
                        }`}
                      />
                    }
                  >
                    <Meta title={b.original_title} description={b.overview} />
                  </Card>
                </Link>
              )}
            </Col>
          ))}
        </Row>
      </Spin>
      <Row justify="center" style={{ marginTop: 32 }}>
        <Pagination
          defaultCurrent={1}
          current={folan.page}
          showSizeChanger={false}
          total={folan.total_results}
          defaultPageSize={20}
          onChange={fetchMoivez}
        />
      </Row>
    </div>
  );
}
