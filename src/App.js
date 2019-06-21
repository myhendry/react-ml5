import React from "react";
import { Layout } from "antd";

import COLORS from "./constants/Colors";
import Nav from "./nav/Nav";
import "./App.css";

const App = () => {
  return (
    <Layout style={{ backgroundColor: COLORS.WHITE }}>
      <Nav />
    </Layout>
  );
};

export default App;
