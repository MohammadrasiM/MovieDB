import { Swiper, SwiperSlide } from "swiper/react";
import React, { useState } from "react";
import { Row, Input } from "antd";

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
  const [background, setBackground] = useState(
    "https://wallpaperaccess.com/full/676037.jpg"
  );
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
    <div>
      <Row gutter={[24, 24]}>
        <Link to={`/upcoming/:id`}>
          {" "}
          <Button
            type="primary"
            style={{
              top: 12,

              gap: 4,
              position: "relative",
              right: 10,
            }}
          >
            See All Upcomin Movies
          </Button>
        </Link>
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
            paddingTop: 35,
            backgroundImage: `url(${background})`,
            paddingBottom: 35,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: " center",
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
          loop
        >
          {folan?.results?.map((b) => (
            <div
              style={{
                aspectRatio: "2 / 3",
                position: "absolute",
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                top: "0",
                background:
                  "linear-gradient(\n      to top,\n      #030d18e3,\n      #030d1875,\n      rgb(12 41 37 / 0%)\n    )",
                zIndex: "2",
              }}
            >
              <SwiperSlide
                style={{
                  aspectRatio: "2 / 3",
                }}
              >
                <Link
                  to={`/Moviedetail/${b.id}`}
                  style={{
                    aspectRatio: "2 / 3",
                    display: "block",
                    width: "100%",
                    height: "100%",
                    position: "relative",
                  }}
                >
                  {" "}
                  <Card
                    style={{
                      // aspectRatio: "2 / 3",
                      overflow: "hidden",
                      height: "100%",
                      width: "100%",
                    }}
                    type="inner"
                    loading={loading}
                    hoverable
                    cover={
                      <img
                        onMouseEnter={(e) => setBackground(e.target.src)}
                        style={{
                          aspectRatio: "2 / 3",
                          width: "100%",
                          position: "absolute",
                          background:
                            "linear-gradient(\n      to top,\n      #030d18e3,\n      #030d1875,\n      rgb(12 41 37 / 0%)\n    )",
                          zIndex: "2",
                        }}
                        alt={b.original_title}
                        src={`https://www.themoviedb.org/t/p/w780${
                          b.profile_path || b.poster_path
                        }`}
                      />
                    }
                  >
                    <Meta title={b.original_title} />
                  </Card>
                </Link>
              </SwiperSlide>
            </div>
          ))}
        </Swiper>
      </Row>
    </div>
  );
}
