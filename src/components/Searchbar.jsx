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
      setValue("");
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

  function type(e) {
    if (e.media_type === "movie") {
      return (
        <Link to={`/Moviedetail/${e.id}`}>
          {" "}
          {e.original_title ? (
            <Card
              style={{ overflow: "hidden", height: 500 }}
              loading={loading}
              hoveraele
              cover={
                <img
                  alt={e.original_title}
                  src={
                    e.poster_path
                      ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${e.poster_path}`
                      : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                  }
                />
              }
            >
              <Meta
                title={e.original_title || e.name}
                description={e.overview}
              />
            </Card>
          ) : (
            <Card
              style={{ overflow: "hidden", height: 500 }}
              loading={loading}
              hoveraele
              cover={
                <img
                  alt={e.original_title}
                  src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${
                    e.profile_path || e.poster_path
                  }`}
                />
              }
            >
              <Meta
                title={e.original_title || e.name}
                description={e.overview}
              />
            </Card>
          )}
        </Link>
      );
    } else if (e.media_type === "person") {
      return (
        <Link to={`/cast/${e.id}`}>
          {" "}
          <Card
            style={{ overflow: "hidden", height: 500 }}
            loading={loading}
            hoverable
            cover={
              <img
                alt={e.original_title}
                src={
                  e.profile_path
                    ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${e.profile_path}`
                    : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                }
              />
            }
          >
            <Meta title={e.original_title || e.name} description={e.overview} />
          </Card>
        </Link>
      );
    }
    // else if (e.media_type === "tv") {
    //   <Link to={`/tv/${e.id}`}>
    //     {" "}
    //     <Card
    //       style={{ overflow: "hidden", height: 500 }}
    //       loading={loading}
    //       hoveraele
    //       cover={
    //         <img
    //           alt={e.original_title}
    //           src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${
    //             e.profile_path || e.poster_path
    //           }`}
    //         />
    //       }
    //     >
    //       <Meta title={e.original_title} description={e.overview} />
    //     </Card>
    //   </Link>;
    // }
    else {
      return (
        <Link to={`/tv/${e.id}`}>
          {" "}
          <Card
            style={{ overflow: "hidden", height: 500 }}
            loading={loading}
            hoverable
            cover={
              <img
                alt={e.original_title}
                src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${
                  e.profile_path || e.poster_path
                }`}
              />
            }
          >
            <Meta title={e.original_title || e.name} description={e.overview} />
          </Card>
        </Link>
      );
    }
  }

  return (
    <div>
      <Spin spinning={loading}>
        {" "}
        <Row gutter={100}>
          {folan?.results?.map((b) => (
            <Col key={b.id} xs={24} sm={12} md={8} xl={6}>
              {type(b)}
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
