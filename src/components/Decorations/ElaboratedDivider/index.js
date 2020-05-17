import React from "react";
import styled from "styled-components";
import CameraIcon from "@material-ui/icons/Camera";
import theme from "utils/themes";

const Separator = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  //! modify animation
  overflow: hidden;
  width: 0;
  animation-delay: 1s;
  animation-duration: 0.7s;
`;

const Line = styled.div`
  border: solid 1px #dee2e6;
  width: 100%;
  max-width: 4rem;
  height: 0;
`;

const CenterIcon = styled.div`
  padding: 0 3px;
  transition: all 1s;
  position: relative;
  margin-top: -2px;
  color: ${theme.nnqduyChickenLuxury};
  :hover svg {
    transition: all 1s;
    transform: rotate(300deg);
    color: gold;
  }
  margin-bottom: 3px;
  //! modify animation
  /* animation-delay: 2.5s; */
`;

function ElaboratedDivider() {
  return (
    <Separator className="expandSide">
      <Line />
      <CenterIcon className="spin">
        <CameraIcon />
      </CenterIcon>
      <Line />
    </Separator>
  );
}

export default ElaboratedDivider;
