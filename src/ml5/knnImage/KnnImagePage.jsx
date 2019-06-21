import React from "react";
import ml5 from "ml5";

// Global Scope myClassifier
let myClassifier;
let features;

export default class KnnImagePage extends React.Component {
  constructor(props) {
    // set up constructor
    super(props);

    // create video ref
    this.videoTag = React.createRef();
    this.myStream = null;

    // set up initial state
    this.state = {
      guess: "",
      probability: null,
      loading: false
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
    features = await this.prepareClassifier(this.videoTag.current);
    console.log("features ", features);
    console.log("The video is ready");
  };

  prepareClassifier = async video => {
    // helper function - set up featureExtractor and classifier
    const featureExtractor = await ml5.featureExtractor("MobileNet");
    // const classifier = await featureExtractor.classification(video);
    // return classifier;
    return featureExtractor;
  };

  onLeftClick = () => {
    const logits = features.infer(this.videoTag.current);
    console.log(logits.dataSync());
    // console.log(logits.dataSync());
    // logits.print();
  };

  onRightClick = () => {
    myClassifier.addImage(this.videoTag.current, "right");
    console.log("Right Button Clicked");
  };

  onTrain = () => {
    myClassifier.train(lossValue => {
      console.log("Loss is", lossValue);
    });
  };

  onPredict = async () => {
    try {
      const results = await myClassifier.classify(this.videoTag.current);
      console.log(results);
      this.setState({
        label: results[0].label,
        probability: results[0].confidence
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { label, probability } = this.state;
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
          <h2>{label}</h2>
          <p>{probability && `${(probability * 100).toFixed(2)}%`}</p>
        </div>
        <div style={{ paddingLeft: 20 }}>
          <button onClick={this.onLeftClick} style={{ margin: 10 }}>
            Left
          </button>
          <button style={{ margin: 10 }} onClick={this.onRightClick}>
            Right
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
