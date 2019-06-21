import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import * as ROUTES from "../nav/Routes";

const Head = () => (
  <Fragment>
    <div>
      <Link to={ROUTES.ML5_IMAGE}>
        Image Classification on Browser using ML5
      </Link>
    </div>
    <div>
      <Link to={ROUTES.ML5_VIDEO}>
        Video Classification on Browser using ML5
      </Link>
    </div>
    <div>
      <Link to={ROUTES.FEATURE_EXTRACTOR}>
        FeatureExtractor Classification using ML5
      </Link>
    </div>
    <div>
      <Link to={ROUTES.FEATURE_EXTRACTOR_REGRESSION}>
        FeatureExtractor Regression using ML5
      </Link>
    </div>
    <div>
      <Link to={ROUTES.KNN_IMAGE}>
        KNN Image Classification on Browser using ML5 - Work in Progress
      </Link>
    </div>
    <div>
      <Link to={ROUTES.YOLO}>Yolo using ML5</Link>
    </div>
  </Fragment>
);

export default Head;
