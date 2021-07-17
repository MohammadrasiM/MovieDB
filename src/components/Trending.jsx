import { Swiper, SwiperSlide } from "swiper/react";
import React, { useRef, useState, useContext } from "react";
import { Spin, Row, Col, Input, Space, Switch } from "antd";
import { ContextContext } from "./context";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { Button } from "antd";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import "./styles.css";

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation } from "swiper/core";

// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

const { Meta } = Card;

export default function Trending() {
  const [folan, setFolan] = useState({});
  const [loading, setLoading] = useState(true);
  const [day, setday] = useState("week");
  React.useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/trending/all/${day}?api_key=70ce45fdad1824ccc3dad6c68ef34779`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFolan(data);
        setLoading(false);
      });
  }, [day]);

  return (
    <>
      <Row gutter={[24, 24]}>
        <Switch
          checkedChildren="Trending Today"
          unCheckedChildren="Trending This Week"
          onClick={() => (day === "day" ? setday("week") : setday("day"))}
        />
        <Swiper
          style={{
            backgroundColor: "whitesmoke",
            paddingBottom: 35,
          }}
          slidesPerView={5}
          spaceBetween={30}
          pagination={{ type: "fraction" }}
          navigation={true}
          className="mySwiper"
        >
          {folan?.results?.map((b) => (
            <SwiperSlide>
              {b.media_type === "movie" ? (
                <Link to={`/Moviedetail/${b.id}`}>
                  {" "}
                  <Card
                    style={{ overflow: "hidden", height: 300, width: 170 }}
                    type="inner"
                    loading={loading}
                    hoverable
                    cover={
                      <img
                        alt={b.name || b.original_title}
                        src={
                          `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${
                            b.profile_path || b.poster_path
                          }` ||
                          `https://image.tmdb.org/t/p/w500${b.poster_path}`
                        }
                      />
                    }
                  >
                    <Meta title={b.original_title || b.name} />
                  </Card>
                </Link>
              ) : (
                <Link to={`/tv/${b.id}`}>
                  {" "}
                  <Card
                    style={{ overflow: "hidden", height: 300, width: 170 }}
                    type="inner"
                    loading={loading}
                    hoverable
                    cover={
                      <img
                        alt={b.name || b.original_title}
                        src={
                          `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${
                            b.profile_path || b.poster_path
                          }` ||
                          `https://image.tmdb.org/t/p/w500${b.poster_path}`
                        }
                      />
                    }
                  >
                    <Meta title={b.original_title || b.name} />
                  </Card>
                </Link>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </Row>
    </>
  );
}
