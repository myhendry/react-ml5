import React from "react";
import ml5 from "ml5";
import { Slider } from "antd";

// Global Scope myClassifier
let myPredictor;
let defaultValue = 30;

export default class FeRegressionPage extends React.Component {
  constructor(props) {
    // set up constructor
    super(props);

    // create video ref
    this.videoTag = React.createRef();
    this.myStream = null;

    // set up initial state
    this.state = {
      value: defaultValue,
      loading: false,
      scale: defaultValue
    };
  }

  componentDidMount() {
    // set up webcam when component mounting
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(this.handleStream)
      .catch(err => console.log(err));
  }

  componentWillUnmount() {
    this.myStream.getTracks().forEach(track => track.stop());
  }

  handleStream = async stream => {
    this.myStream = stream;

    // start receiving stream from webcam
    this.videoTag.current.srcObject = stream;

    // prepare classifier and assign myClassifier in global scope
    myPredictor = await this.preparePredictor(this.videoTag.current);
    console.log(myPredictor);
    console.log("The video is ready");
  };

  preparePredictor = async video => {
    // helper function - set up featureExtractor and classifier
    const featureExtractor = await ml5.featureExtractor("MobileNet");
    const predictor = await featureExtractor.regression(video);
    return predictor;
  };

  onAddExampleClick = () => {
    console.log("scale value", this.state.scale);
    myPredictor.addImage(this.videoTag.current, this.state.scale);
  };

  onTrain = () => {
    myPredictor.train(lossValue => {
      console.log("Loss is", lossValue);
    });
  };

  onPredict = async () => {
    try {
      const results = await myPredictor.predict(this.videoTag.current);
      this.setState({
        value: results.value
      });
    } catch (error) {
      console.log(error);
    }
  };

  onChange = value => {
    this.setState({
      scale: value
    });
    console.log("onChange: ", value);
  };

  render() {
    const { value } = this.state;
    return (
      <div>
        <div style={{ paddingTop: 20 }}>
          <video
            id="myvideo"
            ref={this.videoTag}
            width={426}
            height={240}
            autoPlay
            title="video"
          />
        </div>
        <div style={{ padding: 20 }}>
          <h2>{value && value.toString()}</h2>
        </div>
        <div style={{ paddingLeft: 20 }}>
          <div>
            <Slider defaultValue={defaultValue} onChange={this.onChange} />
          </div>
          <button onClick={this.onAddExampleClick} style={{ margin: 10 }}>
            Add Example
          </button>
          <button style={{ margin: 10 }} onClick={this.onTrain}>
            Train
          </button>
          <button style={{ margin: 10 }} onClick={this.onPredict}>
            Predict
          </button>
        </div>
      </div>
    );
  }
}
