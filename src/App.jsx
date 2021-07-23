import React, { Component, useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import "./App.css";
import { Row, Col, Divider } from "antd";
import { Card } from "antd";
import Firstcontent from "./components/content";
import { Input, Space } from "antd";
import { BrowserRouter, Link, useHistory } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import Contactus from "./components/Contactus";
import Moviedetail from "./components/movie";

import Searchbar from "./components/Searchbar";
import Slider from "./components/Carousel";
import Sweeper from "./components/Sweeper";
import Cast from "./components/Cast";
import Notfound from "./components/Notfound";
import Tvdetail from "./components/Tv";
import Trending from "./components/Trending";
import Picout from "./components/picout";
import useWindowDimensions from "./components/windowsize";
import NowPlaying from "./components/nowPlaying";
import { Button, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Login from "./components/Loginstuf";

const { Search } = Input;

const links = [
  { name: "home", path: "/" },
  { name: "blog", path: "/blog" },
  { name: "contact-us", path: "/contact-us" },
  { name: "login", path: "/Login" },
];
const { Header, Content, Footer } = Layout;
function App() {
  const [value, setValue] = useState("");
  const { height, width } = useWindowDimensions();
  const history = useHistory();
  function handleKeyPress(e) {
    if (e.charCode === 13) {
      history.push(`/search?query=${value}`);
    }
  }
  return (
    <div id="components-layout-demo-custom-trigger">
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
            {links?.map((index) => {
              const key = index.name;
              return (
                <Menu.Item key={key}>
                  <Link to={index.path}>{key}</Link>
                </Menu.Item>
              );
            })}
          </Menu>{" "}
          <Space direction="vertical">
            {width < 700 ? (
              <>
                {" "}
                <Input
                  placeholder="Search"
                  onChange={(e) => setValue(e.target.value)}
                  style={{
                    width: 200,
                    gap: 8,
                    position: " static",

                    right: 48,
                  }}
                />
                <Link to={`/search?query=${value}`}>
                  {" "}
                  <Tooltip title="search">
                    <Button
                      style={{
                        gap: 8,
                        position: " static",
                        top: 16,
                        right: 48,
                      }}
                      type="primary"
                      shape="circle"
                      icon={<SearchOutlined />}
                    />
                  </Tooltip>
                </Link>
                <br />
              </>
            ) : (
              <div>
                <Input
                  placeholder="Search"
                  onChange={(e) => setValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  style={{
                    width: 200,
                    gap: 8,
                    position: " absolute",
                    top: 16,
                    right: 48,
                  }}
                />
                <Link to={`/search?query=${value}`}>
                  {" "}
                  <Tooltip title="search">
                    <Button
                      style={{
                        gap: 8,
                        position: " absolute",
                        top: 16,
                        right: 48,
                      }}
                      type="primary"
                      shape="circle"
                      icon={<SearchOutlined />}
                    />
                  </Tooltip>
                </Link>{" "}
              </div>
            )}
          </Space>
        </Header>

        <Content style={{ padding: "0 50px" }}>
          <div className="site-layout-content"></div>
          <br />
          <Switch>
            <Route path="/contact-us">
              <Contactus />
            </Route>
            <Route path="/search">
              <Searchbar />
            </Route>
            <Route path="/cast/:id">
              <Cast />
            </Route>
            <Route path="/Login">
              <Login />
            </Route>
            <Route path="/upcoming/:id">
              <Firstcontent />
            </Route>
            <Route path="/Moviedetail/:id">
              <Moviedetail />
            </Route>
            <Route path="/tv/:id">
              <Tvdetail />
            </Route>
            {/* <Route path="/pics/:id">
                <Picout />
              </Route> */}
            <Route exact path="/">
              <Slider />
              <Sweeper />
              <Trending />
              <NowPlaying />
            </Route>
            <Route component={Notfound}></Route>
          </Switch>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
