import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Affix, Card, Row, Col } from "antd";
import YouTube from "@u-wave/react-youtube";

import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/components/navigation/navigation.min.css";
import "swiper/swiper.min.css";
import "swiper/components/effect-cube/effect-cube.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import "./styles.css";

import SwiperCore, {
  EffectCube,
  Autoplay,
  Pagination,
  Navigation,
  EffectCoverflow,
} from "swiper/core";
const { Meta } = Card;
SwiperCore.use([EffectCube, Autoplay, Pagination, Navigation, EffectCoverflow]);
export default function Castdetail() {
  const { id } = useParams();
  const [images, setImages] = useState([]);
  const [cast, setCast] = useState([]);

  React.useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/person/${id}?api_key=70ce45fdad1824ccc3dad6c68ef34779&language=en-US`
    )
      .then((response) => response.json())
      .then((data) => {
        setCast(data);
        console.log(data);
      });
  }, []);

  React.useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/person/${id}/images?api_key=70ce45fdad1824ccc3dad6c68ef34779`
    )
      .then((response) => response.json())
      .then((data) => {
        setImages(data.profiles);
        console.log(data);
      });
  }, []);
  return (
    <div className="background">
      <Row>
        {" "}
        <Col span={8}>
          {" "}
          <Card
            hoverable
            style={{ width: 240, height: 350 }}
            cover={
              <img
                alt="example"
                src={
                  `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${
                    cast.profile_path || cast.poster_path
                  }` || `https://image.tmdb.org/t/p/w500${cast.poster_path}`
                }
              />
            }
          ></Card>
        </Col>
        <Col span={16}>
          {" "}
          <div>
            {" "}
            <h1>Biography</h1>
            {cast.biography}
          </div>{" "}
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={12} md={8} xl={6}>
          <h1 className="Otaman-title" style={{ textSizeAdjust: 20 }}>
            {cast.name}
          </h1>
          <h2>Known for</h2>
          {cast.known_for_department}
          <br />
          <h2>Gender</h2>
          {cast.gender === 2 ? "Male" : "Female"}
          <br />
          <h2>Birthday</h2>
          {cast.birthday}
          {cast.deathday && (
            <>
              <h2>Deathday</h2>
              {cast.deathday}
            </>
          )}
          <br />
          <h2>Place of birth</h2>
          {cast.place_of_birth}
          <h2>Also known as</h2>
          {cast?.also_known_as?.map((e) => {
            return <p>{e}</p>;
          })}
        </Col>
        <Col xs={24} sm={12} md={16} xl={14}>
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            className="mySwiper"
          >
            {images?.map((g) => {
              return (
                <SwiperSlide>
                  <a
                    target="_blank"
                    href={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${g.file_path}`}
                  >
                    <img
                      src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${g.file_path}`}
                    />
                  </a>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Col>
      </Row>
      {/* <Row>
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
                  <Card
                    type="inner"
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
                    <Meta title={b.original_name} description={b.character} />
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </Col>
        </Row> */}
    </div>
  );
}
