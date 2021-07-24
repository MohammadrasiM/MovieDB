import { Swiper, SwiperSlide } from "swiper/react";
import React, { useState } from "react";
import { Row, Switch } from "antd";
import { Card } from "antd";
import { Link } from "react-router-dom";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
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
  const [background, setBackground] = useState(
    "https://wallpaperaccess.com/full/676037.jpg"
  );
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
  function usePrevious(value) {
    const ref = React.useRef();
    React.useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  return (
    <div>
      <Row gutter={[24, 24]}>
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
            backgroundPosition: " top 30px",
          }}
          slidesPerView={5}
          slidesPerGroup={5}
          loopFillGroupWithBlank={true}
          spaceBetween={30}
          pagination={{ type: "fraction", clickable: true }}
          navigation={true}
          className="mySwiper"
          loop
        >
          <Switch
            checkedChildren="Trending Today"
            unCheckedChildren="Trending This Week"
            onClick={() => (day === "day" ? setday("week") : setday("day"))}
          />
          {folan?.results?.map((b) => (
            <SwiperSlide
              style={{
                aspectRatio: "2 / 3",
              }}
            >
              {b.media_type === "movie" ? (
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
                        alt={b.name || b.original_title}
                        src={`https://www.themoviedb.org/t/p/w780${
                          b.profile_path || b.poster_path
                        }`}
                      />
                    }
                  >
                    <Meta title={b.original_title || b.name} />
                  </Card>
                </Link>
              ) : (
                <Link
                  to={`/tv/${b.id}`}
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
                        style={{
                          aspectRatio: "2 / 3",
                          width: "100%",
                          position: "absolute",
                          background:
                            "linear-gradient(\n      to top,\n      #030d18e3,\n      #030d1875,\n      rgb(12 41 37 / 0%)\n    )",
                          zIndex: "2",
                        }}
                        onMouseEnter={(e) => setBackground(e.target.src)}
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
    </div>
  );
}
