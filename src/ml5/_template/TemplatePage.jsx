import React, { Component } from "react";

export default class TemplatePage extends Component {
  constructor(props) {
    super(props);
    this.videoTag = React.createRef();
    this.state = {
      guess: "",
      probability: null
    };
  }

  handleStream = async stream => {
    this.videoTag.current.srcObject = stream;
  };

  componentDidMount() {
    // access to webcam
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(this.handleStream)
      .catch(err => console.log(err));
  }

  render() {
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
      </div>
    );
  }
}
