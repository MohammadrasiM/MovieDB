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
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>

            <div className="site-layout-content">Content</div>
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
              <Route path="/:id">
                <Moviedetail />
              </Route>
              <Route exact path="/">
                <Slider />
                <Sweeper />
              </Route>
            </Switch>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
        {/* <Row>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </Col>
        <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </Col>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <p>Card content</p>
            <p>Card content</p>{" "}
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </Col>
      </Row> */}
        , ,
        {/* <Divider orientation="left">sub-element align left</Divider>
      <Row justify="start">
        <Col span={4}>col-4</Col>
        <Col span={4}>col-4</Col>
        <Col span={4}>col-4</Col>
        <Col span={4}>col-4</Col>
      </Row>

      <Divider orientation="left">sub-element align center</Divider>
      <Row justify="center">
        <Col span={4}>col-4</Col>
        <Col span={4}>col-4</Col>
        <Col span={4}>col-4</Col>
        <Col span={4}>col-4</Col>
      </Row>

      <Divider orientation="left">sub-element align right</Divider>
      <Row justify="end">
        <Col span={4}>col-4</Col>
        <Col span={4}>col-4</Col>
        <Col span={4}>col-4</Col>
        <Col span={4}>col-4</Col>
      </Row>

      <Divider orientation="left">sub-element monospaced arrangement</Divider>
      <Row justify="space-between">
        <Col span={4}>col-4</Col>
        <Col span={4}>col-4</Col>
        <Col span={4}>col-4</Col>
        <Col span={4}>col-4</Col>
      </Row>

      <Divider orientation="left">sub-element align full</Divider>
      <Row justify="space-around">
        <Col span={4}>col-4</Col>
        <Col span={4}>col-4</Col>
        <Col span={4}>col-4</Col>
        <Col span={4}>col-4</Col>
      </Row> 
      <Col xs={{ span: 7, offset: 2 }} lg={{ span: 5, offset: 1 }}>*/}
      </div>
    </BrowserRouter>
  );
}

export default App;
