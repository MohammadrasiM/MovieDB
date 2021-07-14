import React, { useState, useContext } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { ContextContext } from "./context";
// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/effect-fade/effect-fade.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import { Link } from "react-router-dom";
import "./styles.css";

// import Swiper core and required modules
import SwiperCore, { EffectFade, Navigation, Pagination } from "swiper/core";

// install Swiper modules
SwiperCore.use([EffectFade, Navigation, Pagination]);

export default function Slider() {
  const { value, setValue } = useContext(ContextContext);

  const imageClick = () => {
    setValue("star wars");
  };
  const imageClic = () => {
    setValue("the lord of the rings");
  };
  const imageCli = () => {
    setValue("Avengers");
  };
  const imageCl = () => {
    setValue("Rick adn morty");
  };
  return (
    <div>
      <Swiper
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
          <Link to={"/search"}>
            {" "}
            <img
              src="https://wallpaperaccess.com/full/124631.jpg"
              onClick={() => imageClick()}
            />
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link to={"/search"}>
            <img
              src="https://wallpaperaccess.com/full/160365.jpg"
              onClick={() => imageClic()}
            />
          </Link>{" "}
        </SwiperSlide>
        <SwiperSlide>
          <Link to={"/search"}>
            <img
              src="https://wallpaperaccess.com/full/4674.jpg"
              onClick={() => imageCli()}
            />
          </Link>{" "}
        </SwiperSlide>
        <SwiperSlide>
          <Link to={"/search"}>
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
