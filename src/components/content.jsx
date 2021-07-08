import React, { useState, useContext } from "react";
import { Spin, Row, Col } from "antd";
import { ContextContext } from "./context";
import { Card } from "antd";
import { Link } from "react-router-dom";
const { Meta } = Card;

export default function Firstcontent() {
  const { value } = useContext(ContextContext);

  const [folan, setFolan] = useState([]);
  const [loading, setLoading] = useState(true);
  React.useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/upcoming?api_key=70ce45fdad1824ccc3dad6c68ef34779&language=en-US&page=1"
    )
      .then((response) => response.json())
      .then((data) => {
        setFolan([...data.results]);
        setLoading(false);
      });
  }, []);
  console.log(folan);
  if (value) {
    return (
      <div>
        <Spin spinning={loading}>
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
                          src={`https://image.tmdb.org/t/p/w500${b.poster_path}`}
                        />
                      }
                    >
                      <Meta title={b.original_title} description={b.overview} />
                    </Card>
                  </Link>
                </Col>
              </>
            ))}
          </Row>
        </Spin>
      </div>
    );
  } else return null;
}
