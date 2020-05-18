import React from "react";
import styled from "styled-components";
// import * as canvas from "canvas";
import { toastLux } from "utils/toast";
import { Spinner } from "reactstrap";
import * as _ from "lodash";

import { Button } from "reactstrap";
import * as faceapi from "face-api.js";

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const VideoWrapper = styled.div`
  position: relative;
  canvas {
    position: absolute;
    top: 10px;
    left: 0;
  }
  border: solid 1px;
  border-radius: 10px;
  padding-top: 10px;
`;

const Control = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 10px;
  width: 20%;
`;

const StartStopControl = styled.div`
  display: flex;
  justify-content: space-around;
  border: solid 1px;
  padding: 10px;
  border-radius: 10px;
  position: relative;
`;

const SnapCompareControl = styled.div`
  display: flex;
  justify-content: space-around;
  border: solid 1px;
  padding: 10px;
  border-radius: 10px;
  position: relative;
  margin-top: 30px;
`;

const ControlTitle = styled.div`
  font-size: 13px;
  font-weight: 700;
  position: absolute;
  top: -11px;
  left: 7px;
  background: white;
  padding: 0 3px;
`;

const SnapShotWrapper = styled.div`
  border: solid 1px;
  border-radius: 10px;
  margin-left: 5px;
  position: relative;
  padding-top: 10px;
`;

const SpinnerWrapper = styled.div`
  border: solid 2px;
  position: absolute;
  height: 100%;
  width: 100%;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
`;

class FaceDetection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isStartBtnDisabled: true,
      perception: {},
      isLoadingVideo: false,
    };
    this.detectTimer = null;
    this.refVideo = React.createRef();
    this.videoDetections = null;
    this.faceMatcher = null;
    this.videoTrack = null;
  }
  async componentDidMount() {
    const uri = "/weights";
    Promise.all([
      faceapi.loadSsdMobilenetv1Model(uri),
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
  }

  componentWillUnmount() {
    this.stopStream();
  }

  async stopStream() {
    const video = document.getElementById("video");
    if (this.videoTrack) {
      clearInterval(this.detectTimer);
      video.pause();
      this.videoTrack[0].stop();
      this.videoTrack[1].stop();
      this.videoTrack = null;
      video.src = "";
    }
  }

  async startVideo() {
    this.setState({ isLoadingVideo: true });
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
          this.videoTrack = stream.getTracks();
        },
        (err) => console.error(err)
      );

      const ref = this;

      video.onloadedmetadata = async function (ev) {
        //show in the video element what is being captured by the webcam
        video.play();
        const canvas = await faceapi.createCanvasFromMedia(video);
        document.querySelector("#camFrame").append(canvas);

        const displaySize = { width: video.width, height: video.height };
        faceapi.matchDimensions(canvas, displaySize);
        ref.detectTimer = setInterval(async () => {
          // , new faceapi.TinyFaceDetectorOptions()
          const detections = await faceapi
            .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceExpressions()
            .withFaceDescriptors();
          ref.videoDetections = detections;
          const resizedDetections = faceapi.resizeResults(
            detections,
            displaySize
          );
          canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
          faceapi.draw.drawDetections(canvas, resizedDetections);
          faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
          faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
          if (ref.state.isLoadingVideo) {
            ref.setState({ isLoadingVideo: false });
          }
        }, 100);
      };
    }
  }

  async snapShot() {
    const video = document.getElementById("video");
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");
    // Draws current image from the video element into the canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    //  canvas.getContext("2d").clearRect(0, 0, canvas.width,
    const displaySize = { width: 600, height: 430 };

    const detections = await faceapi
      .detectAllFaces(document.getElementById("myCanvas"))
      .withFaceLandmarks()
      .withFaceExpressions()
      .withFaceDescriptors();

    if (detections.length > 0) {
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

      // ? save facematcher
      if (!detections.length) {
        return;
      }

      this.faceMatcher = new faceapi.FaceMatcher(detections);
    } else {
      toastLux(
        "Please choose another snapshot, the cannot extract landmark from current snapshot"
      );
    }
  }

  async compare() {
    if (this.faceMatcher) {
      if (this.videoDetections.length !== 0) {
        const bestMatch = this.faceMatcher.findBestMatch(
          this.videoDetections[0].descriptor
        );
        this.setState({ perception: bestMatch });
        console.log(bestMatch);
        console.log(bestMatch.toString());
      } else {
        toastLux("Cannot detect possible object to compare!");
      }
    }
  }

  render() {
    const { isStartBtnDisabled, perception, isLoadingVideo } = this.state;
    return (
      <Wrapper>
        <Control>
          <StartStopControl>
            <ControlTitle>Start/Stop camera stream</ControlTitle>
            <Button
              className="btn-control"
              color="success"
              onClick={() => {
                this.startVideo();
              }}
              disabled={isStartBtnDisabled}
            >
              Start Stream
            </Button>
            <Button
              className="btn-control"
              color="warning"
              onClick={() => {
                this.stopStream();
              }}
            >
              Stop Stream
            </Button>
          </StartStopControl>
          <SnapCompareControl>
            <ControlTitle>Snapshot and Compare</ControlTitle>
            <Button
              color="info"
              onClick={() => {
                this.snapShot();
              }}
            >
              snapshot
            </Button>
            <Button
              color="primary"
              onClick={() => {
                this.compare();
              }}
            >
              Compare
            </Button>
          </SnapCompareControl>
          <SnapCompareControl>
            <ControlTitle>Match Perception</ControlTitle>
            {/* <div>Match: {perception}</div> */}
            <ul>
              <li>Type: {_.get(perception, "_label")}</li>
              <li>
                Match: {`${(1 - _.get(perception, "_distance")) * 100 || 0}%`}
              </li>
            </ul>
          </SnapCompareControl>
        </Control>
        <VideoWrapper id="camFrame">
          <ControlTitle>Stream video</ControlTitle>
          {isLoadingVideo && (
            <SpinnerWrapper>
              <Spinner color="warning" />
            </SpinnerWrapper>
          )}
          <video
            id="video"
            ref={this.refVideo}
            width="600"
            height="430"
            muted
          />
        </VideoWrapper>
        <SnapShotWrapper>
          <ControlTitle>Reference picture</ControlTitle>
          <canvas id="myCanvas" width="600" height="430"></canvas>
        </SnapShotWrapper>
      </Wrapper>
    );
  }
}

export default FaceDetection;
