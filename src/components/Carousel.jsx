import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/effect-fade/effect-fade.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import { Link, useHistory } from "react-router-dom";
import "./styles.css";

// import Swiper core and required modules
import SwiperCore, {
  EffectFade,
  Navigation,
  Autoplay,
  Pagination,
} from "swiper/core";

// install Swiper modules
SwiperCore.use([EffectFade, Navigation, Autoplay, Pagination]);

export default function Slider() {
  const history = useHistory();

  const imageClick = () => {
    history.push(`/search?query=star%20wars`);
  };
  const imageClic = () => {
    history.push(`/search?query=the%20lord%20of%20the%20rings`);
  };
  const imageCli = () => {
    history.push(`/search?query=Avengers`);
  };
  const imageCl = () => {
    history.push(`/search?query=rick%20and%20morty`);
  };
  return (
    <div>
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        style={{ maxHeight: 400 }}
        spaceBetween={30}
        effect={"fade"}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        className="mySwiper"
      >
        <SwiperSlide>
          <Link to={"/search?query=star%20wars"}>
            {" "}
            <img
              src="https://wallpaperaccess.com/full/124631.jpg"
              onClick={() => imageClick()}
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to={"/search?query=the%20lord%20of%20the%20rings"}>
            <img
              src="https://wallpaperaccess.com/full/160365.jpg"
              onClick={() => imageClic()}
            />
          </Link>{" "}
        </SwiperSlide>
        <SwiperSlide>
          <Link to={"/search?query=Avengers"}>
            <img
              src="https://wallpaperaccess.com/full/4674.jpg"
              onClick={() => imageCli()}
            />
          </Link>{" "}
        </SwiperSlide>
        <SwiperSlide>
          <Link to={"/search?query=rick%20and%20morty"}>
            <img
              src="https://wallpaperaccess.com/full/238268.jpg"
              onClick={() => imageCl()}
            />
          </Link>{" "}
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
