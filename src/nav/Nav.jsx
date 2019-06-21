import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { Row, Col } from "antd";

import * as ROUTES from "./Routes";
import Head from "./Head";
import LandingPage from "../LandingPage";
import Ml5ImagePage from "../ml5/image/Ml5ImagePage";
import Ml5VideoPage from "../ml5/video/Ml5VideoPage";
import KnnImagePage from "../ml5/knnImage/KnnImagePage";
import FeatureExtractorPage from "../ml5/featureExtractor/FeatureExtractorPage";
import FeRegressionPage from "../ml5/featureExtractor_regression/FeRegressionPage";
import YoloPage from "../ml5/yolo/YoloPage";

const Nav = () => {
  return (
    <Router>
      <Fragment>
        <Row>
          <Col span={6} style={{ padding: 30 }}>
            <Head />
          </Col>
          <Col span={18}>
            <Switch>
              <Route exact path={ROUTES.LANDING} component={LandingPage} />
              <Route exact path={ROUTES.ML5_IMAGE} component={Ml5ImagePage} />
              <Route exact path={ROUTES.ML5_VIDEO} component={Ml5VideoPage} />
              <Route exact path={ROUTES.KNN_IMAGE} component={KnnImagePage} />
              <Route exact path={ROUTES.YOLO} component={YoloPage} />
              <Route
                exact
                path={ROUTES.FEATURE_EXTRACTOR}
                component={FeatureExtractorPage}
              />
              <Route
                exact
                path={ROUTES.FEATURE_EXTRACTOR_REGRESSION}
                component={FeRegressionPage}
              />
              <Redirect to={ROUTES.LANDING} />
            </Switch>
          </Col>
        </Row>
      </Fragment>
    </Router>
  );
};

export default Nav;
