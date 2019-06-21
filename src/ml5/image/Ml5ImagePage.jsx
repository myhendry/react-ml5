import React, { Component } from "react";
import ml5 from "ml5";
import Dropzone from "react-dropzone";

class ml5ImagePage extends Component {
  constructor(props) {
    super(props);
    this.imageRef = React.createRef();
    this.state = {
      pic: "",
      label: "",
      confidence: null,
      loading: false
    };
  }

  onDrop = async acceptedFiles => {
    try {
      const pic = URL.createObjectURL(acceptedFiles[0]);
      this.setState({
        pic,
        label: "",
        confidence: null,
        loading: true
      });
      const classifier = await ml5.imageClassifier("MobileNet");
      const results = await classifier.predict(this.imageRef.current);
      this.setState({
        label: results[0].label,
        confidence: results[0].confidence,
        loading: false
      });
    } catch (error) {
      this.setState({
        loading: false
      });
      console.log(error);
      throw error;
    }
  };
  render() {
    const { pic, label, confidence, loading } = this.state;
    return (
      <div>
        <div>
          {pic ? (
            <img
              src={pic}
              alt={"pic"}
              style={{ width: 250, height: 150 }}
              ref={this.imageRef}
            />
          ) : null}
        </div>
        <div style={{ paddingTop: 20 }}>
          {loading ? <p>Loading...</p> : null}
        </div>
        <div>
          <h3>{label}</h3>
          <p>{confidence && `${Math.round(confidence * 100)}%`}</p>
        </div>

        <div style={{ padding: 20, cursor: "pointer" }}>
          <Dropzone onDrop={this.onDrop}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drop Image Here</p>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
      </div>
    );
  }
}

export default ml5ImagePage;
