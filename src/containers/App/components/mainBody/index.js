import React from "react";
import styled from "styled-components";
import theme from "utils/themes";
import CameraIcon from "@material-ui/icons/Camera";

import ViXuLyImage from "images/_profile/vi-xu-ly.jpg";
import WebDevImage from "images/_profile/web-dev.jpg";
import VehicleClassifyImage from "images/_profile/vehicle-classification.png";

import sr, { srConfigs } from "utils/scrollReveal";

const cardData = [
  {
    name: "An Electrical and Telecommunication Engineer",
    subName: "INITIATION",
    des:
      "I am always proud of being a part of that blue team. Embedded system, automation, robot, telecom techs, electronic circuit. Whatever i have learned built up a real engineer, who never stop solving problem.",
    img: ViXuLyImage,
  },
  {
    name: "A Computer Engineer",
    subName: "DEVELOPING",
    des:
      "Studying aboard in the U.S let me get into the world of computer science where I and my fellows works on things of machine learning, deep learning, AI,... The fact is that I started to be concerned above all to approach the world of programming.",
    img: VehicleClassifyImage,
    style: `background-position: 95%;`,
  },
  {
    name: "A Software Developer",
    subName: "POTENTIAL",
    des:
      "I wonderd if i was ready for being a professional software developer. Interestingly, the answer is absolutely yes. Over the course of time, the more experience I have the less i know. As long as I keep programming, and learning new teach, I will be always ready for programming works. Essentially, Programming bring me joy.",
    img: WebDevImage,
  },
];

const Section = styled.section`
  padding: 10px 0px;
  video {
    border: solid 1px;
  }
  font-family: "Open Sans";
`;

const HeadLine = styled.h2`
  font-family: "Herr Von Muellerhoff", cursive;
  font-size: 2rem;
  font-style: italic;
  color: ${theme.nnqduyChickenLuxury};
  margin: 1rem 0 1rem 0;
`;

const Container = styled.div`
  position: relative;
`;

const Card = styled.div`
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 30px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  overflow-x: hidden;
  .pf-main--des {
    order: 1;
  }
`;

const CardTitle = styled.h4`
  font-family: "Herr Von Muellerhoff", cursive;
  color: ${theme.nnqduyChickenLuxury};
  font-size: 28px;
`;
const CardSubTitle = styled.h5`
  color: gray;
`;

const CardImg = styled.div`
  width: 100%;
  :before {
    content: "";
    display: block;
    background: url(${({ bgImg }) => bgImg}) center;
    background-size: cover;
    padding-top: 100%;
    box-shadow: 1px 1px 2px 2px gray;
    border-radius: 5px;
    ${({ exStyle }) => exStyle}
  }
  margin-bottom: 1rem;
`;

const CardText = styled.div``;

const CardInfo = styled.div`
  font-size: 16px;
  text-align: justify;
`;

const Detail = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Separator = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
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
`;

class MainBody extends React.PureComponent {
  constructor() {
    super();
    this.refCardText = React.createRef();
  }
  componentDidMount() {
    sr(".animate-left", srConfigs.left);
    sr(".animate-right", srConfigs.right);
  }
  render() {
    return (
      <Section>
        <Container className="container">
          <HeadLine>We make our own story</HeadLine>
          <p>
            The story of us make ourself diffrent from each other. If you are
            reading this message. I am grateful for you being here. It is my
            pleasure get to know you more.
          </p>
          <Detail>
            {cardData.map((item, idx) => (
              <Card key={`car-${idx}`} className="pf-main--card">
                <CardText
                  className={`pf-main--des ${
                    idx % 2 === 0 ? "animate-right" : "animate-left"
                  }`}
                >
                  <CardTitle className="pf-main--card-title">
                    {item.name}
                  </CardTitle>
                  <CardSubTitle>{item.subName}</CardSubTitle>
                  <Separator>
                    <Line />
                    <CenterIcon>
                      <CameraIcon />
                    </CenterIcon>
                    <Line />
                  </Separator>
                  <CardInfo>{item.des}</CardInfo>
                </CardText>
                <CardImg
                  className={`pf-main--card-image ${
                    idx % 2 === 0 ? "animate-left" : "animate-right"
                  }`}
                  bgImg={item.img}
                  exStyle={item.style || {}}
                ></CardImg>
                {/* </CardDes> */}
              </Card>
            ))}
          </Detail>
        </Container>
      </Section>
    );
  }
}

export default MainBody;
