import React, { Component, useState, useContext } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import "./App.css";
import { Row, Col, Divider } from "antd";
import { Card } from "antd";
import Firstcontent from "./components/content";
import { Input, Space } from "antd";
import { BrowserRouter, Link } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import Contactus from "./components/Contactus";
import Moviedetail from "./components/movie";
import { ContextContext } from "./components/context";
import Searchbar from "./components/Searchbar";
import Slider from "./components/Carousel";
import Sweeper from "./components/Sweeper";
import Cast from "./components/Cast";
import Notfound from "./components/Notfound";
import Tvdetail from "./components/Tv";
import Trending from "./components/Trending";
import Picout from "./components/picout";
const { Search } = Input;

const links = [
  { name: "home", path: "/" },
  { name: "blog", path: "/blog" },
  { name: "contact-us", path: "/contact-us" },
];
const { Header, Content, Footer } = Layout;
function App() {
  const { setValue } = useContext(ContextContext);
  return (
    <BrowserRouter>
      <div id="components-layout-demo-custom-trigger">
        <Layout className="layout">
          <Header>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
              {links.map((index) => {
                const key = index.name;
                return (
                  <Menu.Item key={key}>
                    <Link to={index.path}>{key}</Link>
                  </Menu.Item>
                );
              })}
            </Menu>{" "}
            <Space direction="vertical">
              <Link to="/search/:id">
                <Search
                  placeholder="search"
                  onSearch={(e) => setValue(e)}
                  style={{
                    width: 200,
                    gap: 8,
                    position: " absolute",
                    top: 16,
                    right: 48,
                  }}
                />
              </Link>
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
              </Route>
              <Route component={Notfound}></Route>
            </Switch>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
