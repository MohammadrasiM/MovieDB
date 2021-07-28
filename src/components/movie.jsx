import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Card, Row, Col, Button, Popover, message } from "antd";
import YouTube from "@u-wave/react-youtube";

import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { StarTwoTone } from "@ant-design/icons";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/effect-cube/effect-cube.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/effect-coverflow/effect-coverflow.min.css";
import "./styles.css";

import SwiperCore, {
  EffectCube,
  Pagination,
  EffectCoverflow,
  Navigation,
} from "swiper/core";
import { Rate, Table } from "antd";
import SEO from "./Helmet";

import { UserContext } from "./context";
import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";

const customIcons = {
  1: <FrownOutlined />,
  2: <FrownOutlined />,
  3: <MehOutlined />,
  4: <SmileOutlined />,
  5: <SmileOutlined />,
};

const { Meta } = Card;
SwiperCore.use([EffectCube, Navigation, Pagination, EffectCoverflow]);

export default function Moviedetail() {
  const fixedColumns = [
    {
      title: "Author",
      dataIndex: "name",

      width: 60,
    },
    {
      title: "Reveiw",
      dataIndex: "description",
      fixed: true,
    },
  ];

  const { id } = useParams();
  const [top, setTop] = useState([]);
  const [trail, setTrail] = useState([]);
  const [state, setState] = useState([]);
  const [cast, setCast] = useState([]);
  const [reveiws, setReveiws] = useState();
  const [recomendation, setRecomendation] = useState([]);
  const [r, setR] = useState();
  const { user, sessionId } = useContext(UserContext);
  React.useEffect(() => {
    fetch(
      ` https://api.themoviedb.org/3/movie/${id}?api_key=70ce45fdad1824ccc3dad6c68ef34779&language=en-US`
    )
      .then((response) => response.json())
      .then((data) => {
        setState(data);
        console.log(data);
      });
  }, [id]);
  React.useEffect(() => {
    fetch(
      `  https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=70ce45fdad1824ccc3dad6c68ef34779&language=en-US&page=1
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
      ` https://api.themoviedb.org/3/movie/${id}/videos?api_key=70ce45fdad1824ccc3dad6c68ef34779&language=en-US`
    )
      .then((response) => response.json())
      .then((data) => {
        setTrail(data.results);
      });
  }, [id]);
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
  }, [id]);
  React.useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=70ce45fdad1824ccc3dad6c68ef34779&language=en-US&page=1`
    )
      .then((response) => response.json())
      .then((data) => {
        setReveiws(data.results);
      });
  }, [id]);
  let lol = top
    ?.filter((e) => e.job == "Director")
    .map(({ name }) => ({ name }));
  console.log(lol);

  function Raate(v) {
    const url = `
  https://api.themoviedb.org/3/movie/${id}/rating?api_key=70ce45fdad1824ccc3dad6c68ef34779&session_id=${sessionId}`;
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        value: v,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
        console.log(v);
        message.info(`Thanks for Rating ${user.username} `);
      });

    return null;
  }

  function addFav() {
    const url = `https://api.themoviedb.org/3/account/${user?.id}/favorite?api_key=70ce45fdad1824ccc3dad6c68ef34779&session_id=${sessionId}`;
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        media_type: "movie",
        media_id: id,
        favorite: true,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        console.log(data);
      });
    message.info(`Added to your favorite list ${user.username} `);
  }

  return (
    <div
      className="background"
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
    >
      <SEO title={state.original_title} />
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
          {user ? (
            <>
              {" "}
              <Popover content="Add as favorite">
                <Button type="primary" shape="circle" onClick={() => addFav()}>
                  <StarTwoTone spin="true" style={{ fontSize: 32 }} />
                </Button>
              </Popover>
              <br />
              <Rate
                onChange={(value) => Raate(value * 2)}
                allowHalf
                character={({ index }) => customIcons[index + 1]}
              />
            </>
          ) : null}
          <br />
          <a className="Abriel" href={state.homepage} target="__blank">
            Homepage
          </a>
          <h3 className="Abriel">Director:{lol.map((e) => e.name)}</h3>
          <h1 className="Abriel">Score </h1>
          <Rate
            allowHalf
            disabled
            value={Number(state.vote_average) / 2}
          />{" "}
          <br />{" "}
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
                {cast?.map((b) => (
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
              <h1 className="Abriel">Reveiws</h1>

              <Table
                className="Atamic-review"
                columns={fixedColumns}
                dataSource={reveiws?.map((e) => {
                  return { name: e.author, description: e.content };
                })}
                pagination={false}
                scroll={{ x: 200, y: 400 }}
                bordered
                summary={() => (
                  <Table.Summary fixed>
                    <Table.Summary.Row></Table.Summary.Row>
                  </Table.Summary>
                )}
              />
            </Col>
          </Row>
          <br></br>
          <Row>
            <Col xs={24} sm={24} md={24} xl={24}>
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
            </Col>
          </Row>
          <br />
          <Row>
            <Col xs={24} sm={22} md={22} xl={22}>
              <Swiper
                breakpoints={{
                  200: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                    slidesPerGroup: 2,
                  },

                  480: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                    slidesPerGroup: 2,
                  },

                  640: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                    slidesPerGroup: 3,
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
