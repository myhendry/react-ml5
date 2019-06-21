import React, { Component } from "react";
import ml5 from "ml5";

export default class YoloPage extends Component {
  constructor(props) {
    super(props);

    this.videoTag = React.createRef();
    this.myStream = null;

    this.state = {
      loading: false,
      guess: "",
      probability: null
    };
  }

  handleDetect = async snap => {
    const yolo = await ml5.YOLO(snap);

    console.log("yolo model loaded");

    this.setState({
      loading: true
    });

    // Detect objects in the video element
    yolo.detect((err, results) => {
      if (results) {
        console.log(results);
        // this.setState({
        //   loading: false,
        //   guess: results[0].label,
        //   probability: results[0].confidence
        // });
      } else {
        this.setState({
          loading: false
        });
        console.log(err);
      }
    });
  };

  handleStream = async stream => {
    this.myStream = stream;

    this.videoTag.current.srcObject = stream;

    this.handleDetect(this.videoTag.current);
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
    const { loading, guess, probability } = this.state;
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
        <div style={{ paddingTop: 20 }}>
          {loading ? <p>Loading...</p> : null}
        </div>
        <div>
          <h3>{guess}</h3>
          <p>{probability && `${Math.round(probability * 100)}%`}</p>
        </div>
      </div>
    );
  }
}
