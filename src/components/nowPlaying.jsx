import { Swiper, SwiperSlide } from "swiper/react";
import React, { useState } from "react";
import { Row, Switch } from "antd";
import { Card } from "antd";
import { Link } from "react-router-dom";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import "./styles.css";

import SwiperCore, { Pagination, Navigation } from "swiper/core";

import You from "./youtube";
// install Swiper modules
SwiperCore.use([Pagination, Navigation]);

const { Meta } = Card;

export default function NowPlaying() {
  const [loading, setLoading] = useState(true);
  const [now, setNeow] = useState([]);
  const ide = [];
  React.useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=70ce45fdad1824ccc3dad6c68ef34779&language=en-US&page=1`
    )
      .then((response) => response.json())
      .then((data) => {
        setNeow(data.results);
        setLoading(false);
      });
  }, []);

  // const [yo, setYo] = useState([]);
  // React.useEffect(() => {
  //   ide?.map((e) => {
  //     fetch(
  //       ` https://api.themoviedb.org/3/movie/${e}/videos?api_key=70ce45fdad1824ccc3dad6c68ef34779&language=en-US&total_results=1`
  //     )
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setYo(data?.results);
  //         console.log(data?.results);
  //       });
  //   });
  // }, []);
  // console.log(yo);
  return (
    <Row gutter={[24, 24]}>
      <h1
        style={{
          top: 12,

          gap: 4,
          position: "relative",
          right: 10,
        }}
      >
        Latest trailres
      </h1>{" "}
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
            slidesPerView: 4,
            spaceBetween: 40,
            slidesPerGroup: 4,
          },
          1000: {
            slidesPerView: 5,
            spaceBetween: 40,
            slidesPerGroup: 5,
          },
        }}
        style={{
          backgroundColor: "whitesmoke",
          paddingBottom: 35,
        }}
        slidesPerView={5}
        slidesPerGroup={5}
        loopFillGroupWithBlank={true}
        spaceBetween={30}
        pagination={{ type: "fraction", clickable: true }}
        navigation={true}
        className="mySwiper"
      >
        {now?.map((b) => (
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
        ))}
      </Swiper>
    </Row>
  );
}
