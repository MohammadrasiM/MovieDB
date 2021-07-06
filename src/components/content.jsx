import React, { Component, useState } from "react";
import { Layout, Menu, Breadcrumb, Table, Spin } from "antd";

import { Row, Col, Divider } from "antd";
import { Card } from "antd";

const { Meta } = Card;

export default function Firstcontent() {
  const [folan, setFolan] = useState([]);
  const [loading, setLoading] = useState(true);
  React.useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/search/movie?api_key=70ce45fdad1824ccc3dad6c68ef34779&query=Star+Wars"
    )
      .then((response) => response.json())
      .then((data) => {
        setFolan([...data.results]);
        setLoading(false);
      });
  }, []);
  console.log(folan);
  return (
    <div>
      <Spin spinning={loading}>
        <Row>
          {folan.map((b) => (
            <>
              <Col xs={24} sm={12} md={8} xl={6}>
                <Card
                  loading={loading}
                  hoverable
                  style={{ width: 240 }}
                  cover={
                    <img
                      alt="example"
                      src={`https://image.tmdb.org/t/p/w500${b.poster_path}`}
                    />
                  }
                >
                  <p>{b.title}</p>{" "}
                  <Meta title={b.original_title} description={b.overview} />
                </Card>
              </Col>
            </>
          ))}
        </Row>
      </Spin>
    </div>
  );
}
