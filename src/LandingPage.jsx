import React, { Component } from "react";

import { Layout } from "antd";
import COLORS from "./constants/Colors";

const { Content } = Layout;
class LandingPage extends Component {
  render() {
    return (
      <Content
        style={{
          paddingTop: 70,
          backgroundColor: COLORS.WHITE,
          paddingLeft: 30
        }}
      >
        <h1>Hello ML5</h1>
      </Content>
    );
  }
}

export default LandingPage;
