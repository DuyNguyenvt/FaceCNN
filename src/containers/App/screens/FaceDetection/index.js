import React from "react";
import styled from "styled-components";
// import * as canvas from "canvas";
import { toastLux } from "utils/toast";
import { Spinner, Row, Col, Container } from "reactstrap";
import * as _ from "lodash";

import { Button } from "reactstrap";
import * as faceapi from "face-api.js";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  margin-bottom: 10px;
`;

const VideoWrapper = styled.div`
  position: relative;
  canvas {
    position: absolute;
    left: 50%;
    top: 0;

    height: 100%;
    transform: translate(-50%, 0);
  }
  border: solid 1px;
  border-radius: 10px;
  height: 350px;
  padding: 10px 0;
  max-width: 100vw;
  max-height: calc(400 / 630 * 100vw);
`;

const VideoInnerContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  video {
    max-width: 100%;
  }
`;

const Control = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 10px;
  button {
    margin-bottom: 5px;
  }
`;

const StartStopControl = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border: solid 1px;
  padding: 10px;
  border-radius: 10px;
  position: relative;
`;

const SnapCompareControl = styled.div`
  display: flex;
  justify-content: flex-start;
  border: solid 1px;
  padding: 10px;
  border-radius: 10px;
  position: relative;
  margin-top: 30px;
  flex-direction: column;
`;

const ControlTitle = styled.div`
  font-size: 13px;
  font-weight: 700;
  position: absolute;
  top: -11px;
  left: 7px;
  background: white;
  padding: 0 3px;
  white-space: nowrap;
  max-width: 90%;
  overflow-x: hidden;
`;

const SpinnerWrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SnapShotWrapper = styled.div`
  border: solid 1px;
  border-radius: 10px;
  margin-left: 5px;
  position: relative;
  padding-top: 10px;
  height: 350px;
  max-width: 100vw;
  max-height: calc(400 / 630 * 100vw);
`;

const SnapShotCanvas = styled.canvas``;

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
    this.localStream = null;
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
      setTimeout(() => {
        // video.pause();
        this.videoTrack[0].stop();
        this.videoTrack[1].stop();
        this.videoTrack = null;
        video.src = "";
        const $videoCanvas = document.querySelector("#videoCanvas");
        $videoCanvas
          .getContext("2d")
          .clearRect(0, 0, $videoCanvas.width, $videoCanvas.height);
      }, 1000);
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
          this.localStream = stream;
        },
        (err) => console.error(err)
      );

      const ref = this;

      video.onloadedmetadata = async function (ev) {
        //show in the video element what is being captured by the webcam
        video.play();
        const canvas = await faceapi.createCanvasFromMedia(video);
        canvas.setAttribute("id", "videoCanvas");
        document.querySelector("#camFrame").append(canvas);

        const displaySize = {
          width: video.clientWidth,
          height: video.clientHeight,
        };
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
    ctx.drawImage(video, 0, 0, 300, 200);
    //  canvas.getContext("2d").clearRect(0, 0, canvas.width,
    const displaySize = {
      width: video.clientWidth,
      height: video.clientHeight,
    };
    // faceapi.matchDimensions(canvas, displaySize);
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
    const snapshotHeight = _.get(
      document.getElementById("video"),
      "clientHeight"
    );
    const snapshotWidth = _.get(
      document.getElementById("video"),
      "clientWidth"
    );
    return (
      <Wrapper className="row">
        <Col md={12} lg={2} className="mb-4">
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
                  Match:{" "}
                  {`${
                    Math.round((1 - _.get(perception, "_distance")) * 100) || 0
                  }%`}
                </li>
              </ul>
            </SnapCompareControl>
          </Control>
        </Col>
        <Col md={12} lg={5} className="mb-2">
          <VideoWrapper>
            <ControlTitle>Stream video</ControlTitle>
            <VideoInnerContainer id="camFrame">
              {isLoadingVideo && (
                <SpinnerWrapper>
                  <Spinner color="warning" />
                </SpinnerWrapper>
              )}
              <video id="video" ref={this.refVideo} height="100%" muted />
            </VideoInnerContainer>
          </VideoWrapper>
        </Col>
        <Col mg={12} lg={5}>
          <SnapShotWrapper>
            <ControlTitle>Reference picture</ControlTitle>
            <SnapShotCanvas
              id="myCanvas"
              height={snapshotHeight || 600}
              width={snapshotWidth || 420}
            ></SnapShotCanvas>
          </SnapShotWrapper>
        </Col>
      </Wrapper>
    );
  }
}

export default FaceDetection;
