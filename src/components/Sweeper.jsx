import { Swiper, SwiperSlide } from "swiper/react";
import React, { useRef, useState, useContext } from "react";
import { Spin, Row, Col, Input, Space } from "antd";
import { ContextContext } from "./context";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { Button } from "antd";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";

import "./styles.css";

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation, Autoplay } from "swiper/core";

// install Swiper modules
SwiperCore.use([Pagination, Navigation, Autoplay]);

const { Search } = Input;
const { Meta } = Card;

export default function Sweeper() {
  const [searchepage, setSearchpage] = useState();
  const [folan, setFolan] = useState({});
  const [loading, setLoading] = useState(true);
  React.useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=70ce45fdad1824ccc3dad6c68ef34779&language=en-US&page=1`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setFolan(data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Row gutter={[24, 24]}>
        <Link to={`/upcoming/:id`}>
          {" "}
          <Button
            type="primary"
            style={{
              bottom: 1,
              gap: 4,
              position: "relative",
              right: 10,
            }}
          >
            See All Upcomin Movies
          </Button>
        </Link>
        <Swiper
          style={{
            backgroundColor: "whitesmoke",
            paddingBottom: 35,
          }}
          autoplay={{
            delay: 8500,
            disableOnInteraction: false,
          }}
          slidesPerView={"5"}
          slidesPerGroup={5}
          loopFillGroupWithBlank={true}
          spaceBetween={30}
          pagination={{ clickable: true }}
          navigation={true}
          className="mySwiper"
        >
          {folan?.results?.map((b) => (
            <SwiperSlide>
              <Link to={`/Moviedetail/${b.id}`}>
                {" "}
                <Card
                  style={{ overflow: "hidden", height: 300, width: 170 }}
                  type="inner"
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
                  <Meta title={b.original_title} />
                </Card>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </Row>
    </>
  );
}
