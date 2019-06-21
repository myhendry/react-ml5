import React from "react";
import ml5 from "ml5";

export default class Ml5VideoPage extends React.Component {
  constructor(props) {
    super(props);

    this.videoTag = React.createRef();
    this.myStream = null;

    this.state = {
      guess: "",
      probability: null
    };
  }

  prepareModel = async () => {
    // Preparing Model
    const classifier = await ml5.imageClassifier(
      "MobileNet",
      this.videoTag.current
    );

    console.log("Model is Ready");
    return classifier;
  };

  predict = async classifier => {
    // Classify Results
    const results = await classifier.classify();
    console.log(results);
    this.setState({
      label: results[0].label,
      probability: results[0].confidence
    });
  };

  handleStream = async stream => {
    this.myStream = stream;

    this.videoTag.current.srcObject = stream;

    const classifier = await this.prepareModel();

    const that = this;
    Promise.resolve()
      .then(function resolver() {
        return that.predict(classifier).then(resolver);
      })
      .catch(error => {
        console.log("Error: " + error);
      });
  };

  componentDidMount() {
    // access to webcam
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(this.handleStream)
      .catch(err => console.log(err));
  }

  componentWillUnmount() {
    this.myStream.getTracks().forEach(track => track.stop());
  }

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
      </div>
    );
  }
}
