import React from "react";
// import PropTypes from "prop-types";
import styled from "styled-components";
import { Button } from "reactstrap";
import theme from "utils/themes";
import PlaneSpaceImage from "images/_profile/plane-space.jpg";
import SquareTimeImage from "images/_profile/square-time.jpeg";
import CameraIcon from "@material-ui/icons/Camera";

const Section = styled.section`
  height: 100vh;
  width: 100%;
  border: solid 1px;
  position: relative;
  color: white;
  background: url(${({ bgUrl1 }) => bgUrl1}) 35%;
  background-size: cover;
  @keyframes shake {
    from {
      background-position: 35%;
    }
    10%,
    20%,
    30%,
    40%,
    50% {
      background: url(${({ bgUrl1 }) => bgUrl1});
      background-position: 32%;
      background-size: cover;
    }
    15%,
    25%,
    35%,
    45% {
      background: url(${({ bgUrl1 }) => bgUrl1});
      background-position: 37%;
      background-size: cover;
    }
    50% {
      background: url(${({ bgUrl2 }) => bgUrl2}) 50% 50%;
      background-size: cover;
      opacity: 0.2;
    }
    to {
      background: url(${({ bgUrl2 }) => bgUrl2}) 50% 50%;
      background-size: cover;
      opacity: 1;
    }
  }
  animation: shake 3s forwards linear;
  :before {
    content: "";
    position: absolute;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.1);
    width: 100vw;
    height: 100vh;
  }
  display: flex;
  align-items: center;
  text-align: center;
`;

const HeadLine = styled.h2`
  font-family: "Herr Von Muellerhoff", cursive;
  font-size: 2.7rem;
  font-style: italic;
  color: gold;
  line-height: 0.6;
  //! modify animation
  overflow: hidden;
  width: 0;
  animation-delay: 2.5s;
`;

const SubHeadLine = styled.h1`
  font-family: "Source Sans Pro", sans-serif;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 0;
`;

const Container = styled.div`
  position: relative;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  //! modify animation
  opacity: 0;
  animation-delay: 2.1s;
`;
const Description = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Separator = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  //! modify animation
  overflow: hidden;
  width: 0;
  animation-delay: 2.5s;
  animation-duration: 0.7s;
`;
const Line = styled.div`
  border: solid 1px;
  width: 100%;
  max-width: 4rem;
  height: 0;
`;

const CenterIcon = styled.div`
  padding: 0 3px;
  transition: all 1s;
  position: relative;
  margin-top: -2px;
  :hover svg {
    transition: all 1s;
    transform: rotate(300deg);
    color: gold;
  }
  margin-bottom: 3px;
  //! modify animation
  animation-delay: 2.5s;
`;

const ExpButton = styled(Button)`
  background-color: ${theme.nnqduyChickenLuxury};
  :focus {
    background-color: ${theme.nnqduyChickenLuxury} !important;
  }
  :hover {
    background-color: ${theme.nnqduyMelonSexy} !important;
  }
  //! modify animation
  white-space: nowrap;
  overflow: hidden;
  width: 0;
  animation-delay: 2.5s;
  animation-duration: 0.7s;
`;

function Banner() {
  return (
    <Section bgUrl1={PlaneSpaceImage} bgUrl2={SquareTimeImage}>
      <Container className="container moveUp">
        <HeadLine className="expandSide">Welcome</HeadLine>
        <SubHeadLine id="pf-banner--sub-headelin"> My Home</SubHeadLine>
        <Description>
          <Separator className="expandSide">
            <Line />
            <CenterIcon className="spin">
              <CameraIcon />
            </CenterIcon>
            <Line />
          </Separator>
          <ExpButton className="nnqduy-btn--primary expandSide">
            EXPLORE NOW
          </ExpButton>
        </Description>
      </Container>
    </Section>
  );
}

export default Banner;
