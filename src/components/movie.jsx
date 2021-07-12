import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Affix, Card, Row, Col } from "antd";
import YouTube from "@u-wave/react-youtube";

import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper.min.css";
import "swiper/components/effect-cube/effect-cube.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import "./styles.css";

import SwiperCore, {
  EffectCube,
  Pagination,
  EffectCoverflow,
} from "swiper/core";
const { Meta } = Card;
SwiperCore.use([EffectCube, Pagination, EffectCoverflow]);

export default function Moviedetail() {
  const { id } = useParams();
  const [top, setTop] = useState(100);
  const [trail, setTrail] = useState([]);
  const [state, setState] = useState([]);
  const [cast, setCast] = useState([]);
  React.useEffect(() => {
    fetch(
      ` https://api.themoviedb.org/3/movie/${id}?api_key=70ce45fdad1824ccc3dad6c68ef34779&language=en-US`
    )
      .then((response) => response.json())
      .then((data) => {
        setState(data);
        console.log(data);
      });
  }, []);
  React.useEffect(() => {
    fetch(
      ` https://api.themoviedb.org/3/movie/${id}/videos?api_key=70ce45fdad1824ccc3dad6c68ef34779&language=en-US`
    )
      .then((response) => response.json())
      .then((data) => {
        setTrail(data.results);
        console.log(data.results);
      });
  }, []);
  React.useEffect(() => {
    fetch(
      ` https://api.themoviedb.org/3/movie/${id}/credits?api_key=70ce45fdad1824ccc3dad6c68ef34779&language=en-US`
    )
      .then((response) => response.json())
      .then((data) => {
        setCast(data.cast);
        console.log(data);
      });
  }, []);

  return (
    <div className="background">
      <Row>
        {" "}
        <Col span={8}>
          {" "}
          <Affix offsetTop={top}>
            <Card
              hoverable
              style={{ width: 240, height: 350 }}
              cover={
                <img
                  alt="example"
                  src={
                    `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${
                      state.profile_path || state.poster_path
                    }` || `https://image.tmdb.org/t/p/w500${state.poster_path}`
                  }
                />
              }
            ></Card>
          </Affix>
        </Col>
        <Col span={16}>
          {" "}
          <div>
            {" "}
            <h1>OverView</h1>
            {state.overview}
          </div>{" "}
        </Col>
      </Row>
      <Row>
        <Col span={16} xs={24} sm={12} md={8} xl={6} offset={9}>
          {" "}
          <h1>Cast</h1>
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={true}
            className="mySwiper"
          >
            {cast.map((b) => (
              <SwiperSlide
                style={{
                  backgroundColor: "whitesmoke",
                  paddingBottom: 35,
                }}
              >
                {" "}
                <Link to={`/cast/${b.id}`}>
                  {" "}
                  <Card
                    type="inner"
                    hoverable
                    cover={
                      <img
                        alt={b.original_title}
                        src={
                          `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${
                            b.profile_path || b.poster_path
                          }` ||
                          `https://image.tmdb.org/t/p/w500${b.poster_path}`
                        }
                      />
                    }
                  >
                    <Meta title={b.original_name} description={b.character} />
                  </Card>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </Col>
      </Row>
      <Row>
        {" "}
        <Swiper
          style={{ width: 350 }}
          effect={"cube"}
          grabCursor={true}
          cubeEffect={{
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
          }}
          pagination={true}
          className="mySwiper"
        >
          {trail.map((a) => (
            <SwiperSlide
              style={{
                backgroundColor: "whitesmoke",
                paddingBottom: 35,
              }}
            >
              {" "}
              <YouTube video={a.key} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Row>
    </div>
  );
}
