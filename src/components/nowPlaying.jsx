import { Swiper, SwiperSlide } from "swiper/react";
import React, { useState } from "react";
import { Row, Select, Radio, Divider } from "antd";
import { Card } from "antd";
import { Link } from "react-router-dom";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import "./styles.css";

import SwiperCore, { Pagination, Navigation } from "swiper/core";

import You from "./youtube";
import Youtv from "./Youtubetv";
// install Swiper modules
SwiperCore.use([Pagination, Navigation]);
const { Option } = Select;
const { Meta } = Card;

export default function NowPlaying() {
  const [loading, setLoading] = useState(true);
  const [now, setNeow] = useState([]);
  const [tv, setTv] = useState([]);
  const [size, setSize] = useState();
  React.useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=70ce45fdad1824ccc3dad6c68ef34779&language=en-US&page=1`
    )
      .then((response) => response.json())
      .then((data) => {
        setNeow(data.results);
        setLoading(false);
        setSize(data.results);
      });
  }, []);
  React.useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=70ce45fdad1824ccc3dad6c68ef34779&language=en-US&page=1`
    )
      .then((response) => response.json())
      .then((data) => {
        setTv(data.results);
        console.log(data);
      });
  }, []);

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };
  return (
    <Row gutter={[24, 24]}>
      <Divider></Divider>
      <Radio.Group value={size} onChange={handleSizeChange}>
        <Radio.Button value={now}>Upcoming Movies</Radio.Button>
        <Radio.Button value={tv}>Tv</Radio.Button>
      </Radio.Group>

      <Swiper
        breakpoints={{
          200: {
            slidesPerView: 2,
            spaceBetween: 20,
            slidesPerGroup: 2,
          },

          480: {
            slidesPerView: 3,
            spaceBetween: 30,
            slidesPerGroup: 3,
          },

          640: {
            slidesPerView: 3,
            spaceBetween: 30,
            slidesPerGroup: 3,
          },
          1000: {
            slidesPerView: 4,
            spaceBetween: 40,
            slidesPerGroup: 4,
          },
        }}
        style={{
          backgroundColor: "#030d18",
          paddingBottom: 35,
        }}
        loopFillGroupWithBlank={true}
        pagination={{ type: "fraction", clickable: true }}
        navigation={true}
        className="mySwiper"
        loop={true}
      >
        {size === now
          ? size?.map((b) => (
              <SwiperSlide>
                {" "}
                <Card
                  style={{ overflow: "visible", height: 190, width: 300 }}
                  type="inner"
                  loading={loading}
                  hoverable
                  cover={
                    <div className="container">
                      {" "}
                      <You id={b.id} />
                    </div>
                  }
                >
                  <Link to={`/Moviedetail/${b.id}`}>
                    {" "}
                    <Meta title={b.original_title || b.name} />
                  </Link>
                </Card>
              </SwiperSlide>
            ))
          : size?.map((b) => (
              <SwiperSlide>
                {" "}
                <Card
                  style={{ overflow: "visible", height: 190, width: 300 }}
                  type="inner"
                  loading={loading}
                  hoverable
                  cover={
                    <div className="container">
                      {" "}
                      <Youtv id={b.id} />
                    </div>
                  }
                >
                  <Link to={`/tv/${b.id}`}>
                    {" "}
                    <Meta title={b.original_title || b.name} />
                  </Link>
                </Card>
              </SwiperSlide>
            ))}
      </Swiper>
    </Row>
  );
}
