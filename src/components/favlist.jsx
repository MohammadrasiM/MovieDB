import React, { useState, useContext } from "react";

import { Card, Row, Col } from "antd";

import { Link } from "react-router-dom";

import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/effect-cube/effect-cube.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import "./styles.css";

import SEO from "./Helmet";

import { Spin } from "antd";

import { UserContext } from "./context";
const { Meta } = Card;
export default function Favlist() {
  const { user, sessionId } = useContext(UserContext);
  const [fav, setFav] = useState();
  const [loading, setLoading] = useState(true);
  React.useEffect(() => {
    fetch(
      ` 
          https://api.themoviedb.org/3/account/${user?.id}/favorite/movies?api_key=70ce45fdad1824ccc3dad6c68ef34779&session_id=${sessionId}&language=en-US&sort_by=created_at.asc&page=1`
    )
      .then((response) => response.json())
      .then((data) => {
        setFav(data);
        console.log(data);
        setLoading(false);
      });
  }, [user]);
  return (
    <div className="background">
      <SEO title="favorite" />
      <Spin spinning={loading}>
        {" "}
        <Row gutter={100}>
          {fav?.results?.map((b) => (
            <Col key={b.id} xs={24} sm={12} md={8} xl={6}>
              <Link to={`/Moviedetail/${b.id}`}>
                {" "}
                <Card
                  style={{ overflow: "hidden", height: 500 }}
                  loading={loading}
                  hoverable
                  cover={
                    <img
                      alt={b.original_title}
                      src={
                        `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${
                          b.profile_path || b.poster_path
                        }` || `https://image.tmdb.org/t/p/w500${b.poster_path}`
                      }
                    />
                  }
                >
                  <Meta title={b.original_title} description={b.overview} />
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Spin>
    </div>
  );
}
