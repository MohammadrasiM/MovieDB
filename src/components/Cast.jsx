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
  const [works, setWorks] = useState([]);
  React.useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/person/${id}?api_key=70ce45fdad1824ccc3dad6c68ef34779&language=en-US`
    )
      .then((response) => response.json())
      .then((data) => {
        setCast(data);
      });
  }, []);
  React.useEffect(() => {
    fetch(
      ` https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=70ce45fdad1824ccc3dad6c68ef34779&language=en-US`
    )
      .then((response) => response.json())
      .then((data) => {
        setWorks(data.cast);
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
        <Col xs={24} sm={12} md={8} xl={6}>
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
          <br />{" "}
          <h1 className="Otaman-title" style={{ textSizeAdjust: 20 }}>
            {cast.name}
          </h1>
          <h2 className="Abriel">Known for</h2>
          {cast.known_for_department}
          <br />
          <h2 className="Abriel">Gender</h2>
          {cast.gender === 2 ? "Male" : "Female"}
          <br />
          <h2 className="Abriel">Birthday</h2>
          {cast.birthday}
          {cast.deathday && (
            <>
              <h2 className="Abriel">Deathday</h2>
              {cast.deathday}
            </>
          )}
          <br />
          <h2 className="Abriel">Place of birth</h2>
          {cast.place_of_birth}
          <h2>Also known as</h2>
          {cast?.also_known_as?.map((e) => {
            return <p>{e}</p>;
          })}
        </Col>
        <Col xs={24} sm={12} md={8} xl={6}>
          {" "}
          <div className="Cinzel">
            {" "}
            <h1 className="Abriel">Biography</h1>
            {cast.biography}
          </div>{" "}
        </Col>
        <Col xs={24} sm={12} md={8} xl={12}>
          <Swiper
            style={{ maxHeight: 500 }}
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
                    href={`https://www.themoviedb.org/t/p/original${g.file_path}`}
                  >
                    <img
                      src={`https://www.themoviedb.org/t/p/w500${g.file_path}`}
                    />
                  </a>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <table
            id="customers"
            style={{ border: "1px solid black", borderCollapse: "collapse" }}
          >
            <tr
              style={{ border: "1px solid black", borderCollapse: "collapse" }}
            >
              <th
                className="Abriel"
                style={{
                  border: "1px solid black",
                  borderCollapse: "collapse",
                }}
              >
                year
              </th>
              <th
                className="Abriel"
                style={{
                  border: "1px solid black",
                  borderCollapse: "collapse",
                }}
              >
                Project
              </th>
              <th
                className="Abriel"
                style={{
                  border: "1px solid black",
                  borderCollapse: "collapse",
                }}
              >
                character
              </th>
            </tr>
            {works
              ?.sort((a, b) => {
                if (a.release_date < b.release_date) {
                  return 1;
                }
                if (a.release_date > b.release_date) {
                  return -1;
                }
                return 0;
              })
              .map((d) => (
                <tr>
                  <td
                    className="Cinzel"
                    style={{
                      border: "1px solid black",
                      borderCollapse: "collapse",
                    }}
                  >
                    {d.release_date ? d.release_date : "no Date"}
                  </td>{" "}
                  <td
                    className="Cinzel"
                    style={{
                      border: "1px solid black",
                      borderCollapse: "collapse",
                    }}
                  >
                    {" "}
                    <Link to={`/Moviedetail/${d.id}`}>{d.original_title}</Link>
                  </td>
                  <td
                    className="Cinzel"
                    style={{
                      border: "1px solid black",
                      borderCollapse: "collapse",
                    }}
                  >
                    {d.character}
                  </td>
                </tr>
              ))}
          </table>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={12} md={8} xl={24}></Col>
      </Row>
    </div>
  );
}
