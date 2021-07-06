import React, { Component, useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import "./App.css";
import { Row, Col, Divider } from "antd";
import { Card } from "antd";
import Firstcontent from "./components/content";

const { Meta } = Card;

const { Header, Content, Footer } = Layout;
function App() {
  return (
    <div id="components-layout-demo-custom-trigger">
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
            {new Array(5).fill(null).map((_, index) => {
              const key = index + 1;
              return <Menu.Item key={key}>{`nav ${key}`}</Menu.Item>;
            })}
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-content">Content</div>
          <Firstcontent />
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
  );
}

export default App;
