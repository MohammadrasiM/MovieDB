import React, { useRef, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Card, Row, Col, Rate, Button, Popover } from "antd";
import YouTube from "@u-wave/react-youtube";
import { StarTwoTone } from "@ant-design/icons";
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
import SEO from "./Helmet";
import { UserContext } from "./context";
const { Text } = Typography;
const { Meta } = Card;
SwiperCore.use([EffectCube, Pagination, EffectCoverflow]);

export default function Tvdetail() {
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

  const { user } = useContext(UserContext);
  const [trail, setTrail] = useState([]);
  const [state, setState] = useState([]);
  const [cast, setCast] = useState([]);
  const [reveiws, setReveiws] = useState();
  const [recomendation, setRecomendation] = useState([]);
  React.useEffect(() => {
    fetch(
      ` https://api.themoviedb.org/3/tv/${id}?api_key=70ce45fdad1824ccc3dad6c68ef34779&language=en-US`
    )
      .then((response) => response.json())
      .then((data) => {
        setState(data);
        console.log(data);
      });
  }, [id]);
  React.useEffect(() => {
    fetch(
      `  https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=70ce45fdad1824ccc3dad6c68ef34779&language=en-US&page=1
      `
    )
      .then((response) => response.json())
      .then((data) => {
        setRecomendation(data.results);
        console.log(data.results);
      });
  }, [id]);
  React.useEffect(() => {
    fetch(
      ` https://api.themoviedb.org/3/tv/${id}/videos?api_key=70ce45fdad1824ccc3dad6c68ef34779&language=en-US`
    )
      .then((response) => response.json())
      .then((data) => {
        setTrail(data.results);
      });
  }, [id]);
  React.useEffect(() => {
    fetch(
      ` https://api.themoviedb.org/3/tv/${id}/credits?api_key=70ce45fdad1824ccc3dad6c68ef34779&language=en-US`
    )
      .then((response) => response.json())
      .then((data) => {
        setCast(data.cast);
      });
  }, [id]);
  React.useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/${id}/reviews?api_key=70ce45fdad1824ccc3dad6c68ef34779&language=en-US&page=1`
    )
      .then((response) => response.json())
      .then((data) => {
        setReveiws(data.results);
      });
  }, [id]);

  return (
    <div
      style={{
        background:
          "linear-gradient(rgb(0, 0, 0, 0.5) 100%, rgba(0, 0,0, 0.5)100%)," +
          "url(" +
          `https://image.tmdb.org/t/p/w1280${state.backdrop_path}` +
          ")",
        backgroundsize: "cover",
        backgroundposition: "center, right bottom",
        backgroundrepeat: "no-repeat, no-repeat",
      }}
      className="background"
    >
      <SEO title={state.name} />
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
          <h1 className="Otaman-title">{state.name}</h1>
          {user ? (
            <Link to={`/Addfavtv/${id}`}>
              <Popover content="Add as favorite">
                <Button type="primary" shape="circle">
                  <StarTwoTone
                    spin="true"
                    rotate={180}
                    style={{ fontSize: 32 }}
                  />
                </Button>
              </Popover>
            </Link>
          ) : null}
          <a className="Abriel" href={state.homepage} target="__blank">
            Homepage
          </a>
          <br />
          <h1 className="Abriel">Score</h1>
          <Rate allowHalf disabled value={Number(state.vote_average) / 2} />
          <br />
          <h3 className="Abriel">
            First air date<p>{state.first_air_date}</p>
          </h3>
          <h4 className="Abriel">
            Genres:
            {state?.genres?.map((g) => `${g.name},`)}
          </h4>
          <h3 className="Abriel">
            Created by:{state?.created_by?.map((d) => `${d.name},`)}
          </h3>
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
              <h1 className="Abriel">Cast</h1>
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
                      paddingBottom: 95,
                    }}
                  >
                    {" "}
                    <Link to={`/cast/${b.id}`}>
                      {" "}
                      <Card
                        type="outter"
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
              <h1 className="Abriel">Reveiws</h1>

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
                    background: "inherit",
                    paddingBottom: 35,
                    paddingTop: 0,
                  }}
                >
                  {" "}
                  <YouTube video={a.key} />
                </SwiperSlide>
              ))}
            </Swiper>
          </Row>
          <br />
          <Row>
            <Col xs={24} sm={20} md={20} xl={20}>
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
                  background: "inherit",
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
                {recomendation?.map((b) => (
                  <SwiperSlide>
                    {b.media_type === "movie" ? (
                      <Link to={`/Moviedetail/${b.id}`}>
                        {" "}
                        <Card
                          style={{
                            overflow: "visible",
                            height: 300,
                            width: 170,
                          }}
                          type="inner"
                          hoverable
                          cover={
                            <img
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
                    ) : (
                      <Link to={`/tv/${b.id}`}>
                        {" "}
                        <Card
                          style={{
                            overflow: "hidden",
                            height: 300,
                            width: 170,
                          }}
                          type="inner"
                          hoverable
                          cover={
                            <img
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
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
