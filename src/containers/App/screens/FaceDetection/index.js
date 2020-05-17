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

`;

const VideoWrapper = styled.div`
  position: relative;
  canvas {
    position: absolute;
    top: 0;
    left: 0;
    border: solid 2px green;
  }
`;

const Control = styled.div`
  display: flex;
  flex-direction: column;
`;

const SnapShotWrapper = styled.div``;

class FaceDetection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoTrack: null,
      isStartBtnDisabled: true,
      faceMatcher: null,
      resizeWindow: null,
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
        faceapi.loadSsdMobilenetv1Model(uri),
        faceapi.nets.tinyFaceDetector.loadFromUri(uri),
        faceapi.nets.faceLandmark68Net.loadFromUri(uri),
        faceapi.nets.faceRecognitionNet.loadFromUri(uri),
        faceapi.nets.faceExpressionNet.loadFromUri(uri),
        faceapi.nets.faceD
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
            // deviceId: "8d1dcdff-2b3d-46d2-8746-e7c6e6615233",
            // width: { min: 720 },
            // height: { min: 560 },
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
          // , new faceapi.TinyFaceDetectorOptions()
          const detections = await faceapi
            .detectAllFaces(video)
            .withFaceLandmarks()
            .withFaceExpressions()
            .withFaceDescriptors();
          const resizedDetections = faceapi.resizeResults(
            detections,
            displaySize
          );

          canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
          faceapi.draw.drawDetections(canvas, resizedDetections);
          faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
          faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
          if (ref.state.faceMatcher){
            // console.log(detections)
            if(detections.length !==0){

            const bestMatch = ref.state.faceMatcher.findBestMatch(detections[0].descriptor)
            console.log(bestMatch.toString())
            }

          }

        }, 50);
      };

    }
  }

  async snapShot(){
    const video = document.getElementById("video");
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext('2d');
      // Draws current image from the video element into the canvas
     ctx.drawImage(video, 0,0, canvas.width, canvas.height);
    //  canvas.getContext("2d").clearRect(0, 0, canvas.width, 
    const displaySize = { width: 400, height: 350 };

    const detections = await faceapi
    .detectAllFaces(document.getElementById("myCanvas"))
    .withFaceLandmarks()
    .withFaceExpressions()
    .withFaceDescriptors();
  const resizedDetections = faceapi.resizeResults(
    detections,
    displaySize
  );

     faceapi.draw.drawDetections(canvas, resizedDetections);
     faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
     faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

  }


  async compare(){
    const results = await faceapi
    .detectAllFaces(document.getElementById("myCanvas"))
    .withFaceLandmarks()
    .withFaceDescriptors()

    // , new faceapi.TinyFaceDetectorOptions()
    // ,new faceapi.TinyFaceDetectorOptions()
  if (!results.length) {
    return
  }
  
  // create FaceMatcher with automatically assigned labels
  // from the detection results for the reference image
  const faceMatcher = new faceapi.FaceMatcher(results)
  this.setState({faceMatcher: faceMatcher})
  }

  render() {
    const { isStartBtnDisabled } = this.state;
    return (
      <Wrapper>
        <Control>
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
        <Button onClick={()=>{
          this.snapShot();
        }}>
          snapshot
        </Button>
        <Button onClick={()=>{
          this.compare();
        }}>
          Compare
        </Button>
        </Control>
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
        <SnapShotWrapper>
        <p>

        Screenshots : </p>
      <canvas  id="myCanvas" width="400" height="350"></canvas>  
        </SnapShotWrapper>
      </Wrapper>
    );
  }
}

export default FaceDetection;
