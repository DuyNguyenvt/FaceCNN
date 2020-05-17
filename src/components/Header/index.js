/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
// import PropTypes from "prop-types";
import styled from "styled-components";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import { Button } from "reactstrap";
import theme from "utils/themes";
import { toastLux } from "utils/toast";
import * as modalActions from "containers/Modals/actions";

const HeaderX = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  padding: 10px;
  width: 100%;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), transparent);
  z-index: 1300;
  color: white;
  @media screen and (min-width: 700px) {
    .header-btn--menu {
      display: none;
    }
    .header-nav {
      justify-content: space-between !important;
    }
    .header-nav-list {
      transform: initial;
      display: initial;
      position: initial;
      width: initial;
      height: initial;
      background: initial;
      display: flex;
      flex-wrap: wrap;
      margin: initial;
      padding: initial;
      li {
        padding: 0 2rem;
        border: none;
        margin: 0;
      }
    }
  }
`;

const Logo = styled.h3`
  display: fixed;
  position: relative;
  display: inline-block;
  a {
    text-decoration: none;
    color: white;
  }
  img {
    max-width: 100%;
    filter: grayscale(40%);
  }
`;

const ToggleBtn = styled(Button)`
  background: none !important;
  border: none;
  :focus {
    box-shadow: none !important;
  }
  position: fixed;
  right: 10px;
  top: 15px;
  z-index: 1250;
  svg {
    display: none;
  }
  svg.active {
    display: block;
  }
`;

const Nav = styled.nav`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  &.active {
    ::before {
      content: "";
      background: rgba(0, 0, 0, 0.5);
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 950;
    }
  }
`;

const NavList = styled.ul`
  position: fixed;
  overflow: hidden;
  top: 0;
  left: 0;
  height: 100%;
  background: ${theme.nnqduyDark};
  color: white;
  width: 0px;
  padding: 0;
  width: 80vw;
  padding: 40px;
  transition: all 0.5s;
  transform: translateX(-100%);
  &.drawed {
    transform: translateX(0);
  }
  z-index: 1300;
`;

const NavItem = styled.li`
  list-style-type: none;
  border: solid 3px white;
  border-width: 0 0 2px 0;
  padding: 0 0 5px 0;
  margin-bottom: 20px;
  a {
    text-decoration: none;
    cursor: pointer;
    color: white;
    font-weight: 800;
  }
`;

const Container = styled.div``;

function Header(props) {
  const NavListEl = React.createRef();
  const NavEl = React.createRef();
  const HamburgerIconEl = React.createRef();
  const CloseIconEl = React.createRef();
  const handleClickToggleBtn = () => {
    NavListEl.current.classList.toggle("drawed");
    NavEl.current.classList.toggle("active");
    HamburgerIconEl.current.classList.toggle("active");
    CloseIconEl.current.classList.toggle("active");
  };
  const { dispatch } = props;
  return (
    <HeaderX>
      <Container className="Container">
        <Nav ref={NavEl} className="header-nav">
          <Logo className="header-logo">
            <a href="/">DN</a>
          </Logo>
          <NavList ref={NavListEl} className="header-nav-list">
            <NavItem>
              <a href="/">Home</a>
            </NavItem>
            <NavItem
              onClick={() => {
                toastLux("The projects will be upload later!");
              }}
            >
              <a>Project</a>
            </NavItem>
            <NavItem
              onClick={() => {
                toastLux("About me page is not ready");
                setTimeout(() => {
                  const $headerCloseBtn = document.querySelector(
                    ".header-btn--menu"
                  );
                  if (getComputedStyle($headerCloseBtn).display !== "none") {
                    $headerCloseBtn.click();
                  }
                  dispatch(modalActions.toggleToResumeModal(true));
                }, 1500);
              }}
            >
              <a>About me</a>
            </NavItem>
          </NavList>
          <ToggleBtn
            className="header-btn--menu"
            onClick={() => handleClickToggleBtn()}
          >
            <MenuIcon ref={HamburgerIconEl} className="active" />
            <CloseIcon ref={CloseIconEl} />
          </ToggleBtn>
        </Nav>
      </Container>
    </HeaderX>
  );
}

export default Header;
