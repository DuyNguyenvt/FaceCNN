import React from "react";
import styled from "styled-components";
// import * as canvas from "canvas";

import { Button } from "reactstrap";
import * as faceapi from "face-api.js";
var path = require("path");

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
  align-items: center;
  canvas {
    position: absolute;
    top: 0;
    left: 0;
    border: solid 2px green;
  }
`;

const VideoWrapper = styled.div`
  position: relative;
`;

class FaceDetection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoTrack: null,
      isStartBtnDisabled: true,
    };
    this.detectTimer = null;
    this.refVideo = React.createRef();
  }
  async componentDidMount() {
    setTimeout(() => {
      const video = document.getElementById("video");
      const uri = "/weights";
      // console.log(path.resolve(__dirname));
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(uri),
        faceapi.nets.faceLandmark68Net.loadFromUri(uri),
        faceapi.nets.faceRecognitionNet.loadFromUri(uri),
        faceapi.nets.faceExpressionNet.loadFromUri(uri),
      ])
        .then(() => {
          this.setState({ isStartBtnDisabled: false });
        })
        .catch((err) => {
          console.log("err", err);
          this.setState({ isStartBtnDisabled: false });
        });
    }, 3000);
  }

  componentWillUnmount() {
    // const { videoTrack } = this.state;
    // const video = document.getElementById("video");
    // if (videoTrack) {
    //   video.pause();
    //   video.src = "";
    //   videoTrack[0].stop();
    //   videoTrack[1].stop();
    // }
    this.stopStream();
  }

  async stopStream() {
    const { videoTrack } = this.state;
    const video = document.getElementById("video");
    console.log(videoTrack);
    if (videoTrack) {
      clearInterval(this.detectTimer);
      video.pause();
      video.src = "";
      videoTrack[0].stop();
      videoTrack[1].stop();
      this.setState({ videoTrack: null });
    }
  }

  async startVideo() {
    const video = document.getElementById("video");
    if (navigator.mediaDevices.getUserMedia !== null) {
      navigator.webkitGetUserMedia(
        {
          audio: { echoCancellation: true },
          video: {
            deviceId: "8d1dcdff-2b3d-46d2-8746-e7c6e6615233",
            width: { min: 720 },
            height: { min: 560 },
          },
        },
        (stream) => {
          video.srcObject = stream;
          this.setState({
            videoTrack: stream.getTracks(),
          });
        },
        (err) => console.error(err)
      );

      const ref = this;

      video.onloadedmetadata = function (ev) {
        //show in the video element what is being captured by the webcam
        video.play();
        //   if (this.state.videoTrack !== null) {
        const canvas = faceapi.createCanvasFromMedia(video);
        // document.body.append(canvas);
        document.querySelector("#camFrame").append(canvas);

        const displaySize = { width: video.width, height: video.height };
        faceapi.matchDimensions(canvas, displaySize);
        ref.detectTimer = setInterval(async () => {
          const detections = await faceapi
            .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceExpressions();
          const resizedDetections = faceapi.resizeResults(
            detections,
            displaySize
          );
          canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
          faceapi.draw.drawDetections(canvas, resizedDetections);
          faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
          faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
        }, 150);
      };

      // video.addEventListener("play", () => {
      //   if (this.state.videoTrack !== null) {
      //     const canvas = faceapi.createCanvasFromMedia(video);
      //     // document.body.append(canvas);
      //     document.querySelector("#camFrame").append(canvas);

      //     const displaySize = { width: video.width, height: video.height };
      //     faceapi.matchDimensions(canvas, displaySize);
      //     setInterval(async () => {
      //       const detections = await faceapi
      //         .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      //         .withFaceLandmarks()
      //         .withFaceExpressions();
      //       const resizedDetections = faceapi.resizeResults(
      //         detections,
      //         displaySize
      //       );
      //       canvas
      //         .getContext("2d")
      //         .clearRect(0, 0, canvas.width, canvas.height);
      //       faceapi.draw.drawDetections(canvas, resizedDetections);
      //       faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      //       faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
      //     }, 150);
      //   }
      // });
    }

    // await this.handleDraw();

    // navigator.getUserMedia(
    //   {
    //     video: true,
    //   },
    //   (stream) => {
    //     this.handleStream(stream);
    //     this.setState({
    //       videoTrack: stream.getTracks(),
    //     });
    //   },
    //   (error) => console.log(error)
    // );

    // const uri = "/weights";
    // Promise.all([
    //   // faceapi.nets.tinyFaceDetector.loadFromUri(uri),
    //   faceapi.nets.faceLandmark68Net.loadFromUri(uri),
    //   // faceapi.nets.faceRecognitionNet.loadFromUri(uri),
    //   // faceapi.nets.faceExpressionNet.loadFromUri(uri),
    // ]).then(() => {
    //   const canvas = faceapi.createCanvasFromMedia(this.refVideo.current);
    //   document.body.append(canvas);
    //   const displaySize = {
    //     width: this.refVideo.current.width,
    //     height: this.refVideo.current.height,
    //   };
    //   faceapi.matchDimensions(canvas, displaySize);
    //   setInterval(async () => {
    //     const detections = await faceapi
    //       .detectAllFaces(
    //         this.refVideo.current.srcObject,
    //         new faceapi.TinyFaceDetectorOptions()
    //       )
    //       .withFaceLandmarks()
    //       .withFaceExpressions();
    //     const resizedDetections = faceapi.resizeResults(
    //       detections,
    //       displaySize
    //     );
    //     canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    //     faceapi.draw.drawDetections(canvas, resizedDetections);
    //     faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    //     faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
    //   }, 100);
    // });

    // const displaySize = { width: .width, height: input.height };
    // // resize the overlay canvas to the input dimensions
    // const canvas = document.getElementById("overlay");
    // faceapi.matchDimensions(canvas, displaySize);
  }

  render() {
    const { isStartBtnDisabled } = this.state;
    return (
      <Wrapper>
        <Button
          color="success"
          onClick={() => {
            this.startVideo();
          }}
          disabled={isStartBtnDisabled}
        >
          Start webcam
        </Button>
        <Button
          color="warning"
          onClick={() => {
            this.stopStream();
          }}
        >
          Stop Stream
        </Button>
        <VideoWrapper id="camFrame">
          <video
            id="video"
            ref={this.refVideo}
            width="720"
            height="560"
            autoPlay
            muted
          />
        </VideoWrapper>
      </Wrapper>
    );
  }
}

export default FaceDetection;
