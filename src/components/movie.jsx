import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Affix, Card, Row, Col, Rate } from "antd";
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
import { Table, Typography } from "antd";

const { Text } = Typography;
const { Meta } = Card;
SwiperCore.use([EffectCube, Pagination, EffectCoverflow]);

export default function Moviedetail() {
  const fixedColumns = [
    {
      title: "Author",
      dataIndex: "name",
      fixed: true,
      width: 100,
    },
    {
      title: "Reveiw",
      dataIndex: "description",
    },
  ];

  const { id } = useParams();
  const [top, setTop] = useState([]);
  const [trail, setTrail] = useState([]);
  const [state, setState] = useState([]);
  const [cast, setCast] = useState([]);
  const [reveiws, setReveiws] = useState();

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
        setTop(data.crew);
      });
  }, []);
  React.useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=70ce45fdad1824ccc3dad6c68ef34779&language=en-US&page=1`
    )
      .then((response) => response.json())
      .then((data) => {
        setReveiws(data.results);
      });
  }, []);
  let lol = top
    ?.filter((e) => e.job == "Director")
    .map(({ name }) => ({ name }));
  console.log(lol);
  return (
    <div
      className="background"
      style={{
        background:
          "linear-gradient(rgb(255, 255, 255, 0.5) 100%, rgba(255, 255,255, 0.5)100%)," +
          "url(" +
          `https://image.tmdb.org/t/p/w1280${state.backdrop_path}` +
          ")",
        backgroundsize: "cover",
        backgroundposition: "center, right bottom",
        backgroundrepeat: "no-repeat, no-repeat",
      }}
    >
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
                    state.profile_path || state.poster_path
                  }` || `https://image.tmdb.org/t/p/w500${state.poster_path}`
                }
              />
            }
          ></Card>
          <br />
          <h1 className="Otaman-title">{state.original_title}</h1>
          <a href={state.homepage} target="__blank">
            Homepage
          </a>
          <h3 className="Abriel">Director:{lol.map((e) => e.name)}</h3>
          <br />
          <h1 className="Abriel">Score</h1>
          <Rate allowHalf disabled value={Number(state.vote_average) / 2} />
          <br />
          <h3 className="Abriel">
            release date<p>{state.release_date}</p>
          </h3>
          <h4 className="Abriel">
            Genres:
            {state?.genres?.map((g) => `${g.name},`)}
          </h4>
          <h3 className="Abriel">budget:{state.budget}$</h3>
        </Col>
        <Col xs={24} sm={12} md={16} xl={18}>
          {" "}
          <div className="Cinzel">
            {" "}
            <h1 className="Abriel">OverView</h1>
            {state.overview}
          </div>{" "}
          <Row>
            <Col xs={24} sm={12} md={8} xl={6}>
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
                      paddingBottom: 20,
                      paddingTop: 0,
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
                        <Meta
                          title={b.original_name}
                          description={b.character}
                        />
                      </Card>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Col>
            <Col xs={24} sm={12} md={12} xl={12}>
              <h1>Reveiws</h1>

              <Table
                className="Atamic-review"
                columns={fixedColumns}
                dataSource={reveiws?.map((e) => {
                  return { name: e.author, description: e.content };
                })}
                pagination={false}
                scroll={{ x: 200, y: 600 }}
                bordered
                summary={() => (
                  <Table.Summary fixed>
                    <Table.Summary.Row></Table.Summary.Row>
                  </Table.Summary>
                )}
              />
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
        </Col>
      </Row>
    </div>
  );
}
