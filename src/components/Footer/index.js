import React from "react";
// import PropTypes from "prop-types";
import styled from "styled-components";
import TextInput from "components/Form/TextInput";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import EmailIcon from "@material-ui/icons/Email";

const FooterX = styled.footer`
  color: white;
  background: #121212;
  padding: 20px 0;
  align-items: center;
  text-align: center;
  ul {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 20px 0;
    margin: 0;
    li {
      list-style-type: none;
      padding: 10px;
      svg {
        color: lightgrey;
        :hover {
          color: gold;
        }
      }
    }
  }
  @media screen and (min-width: 700px) {
    .pf-footer--devider {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }
`;

const HeadLine = styled.h2`
  font-family: "Herr Von Muellerhoff", cursive;
  font-size: 2.7rem;
  font-style: italic;
  color: gold;
`;

const SubHeadLine = styled.h1`
  font-family: "Source Sans Pro", sans-serif;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 0;
  color: white;
`;

const ContactBox = styled.div`
  color: black;
  width: 100%;
  max-width: 30rem;
  position: relative;
  margin: 0 auto;
  svg {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0.5rem;
  }
`;
const Container = styled.div``;

function Footer() {
  return (
    <FooterX>
      <Container className="container">
        <HeadLine>Tour End</HeadLine>
        <SubHeadLine id="pf-banner--sub-headelin"> Contact Me</SubHeadLine>
        <div className="pf-footer--devider">
          <div>
            <div>nnqduy.spkt@gmail.com</div>
            <div>+84 338661531</div>
          </div>
          <div>
            <ul>
              <li>
                <a href="/">
                  <FacebookIcon />
                </a>{" "}
              </li>
              <li>
                <a href="/">
                  <TwitterIcon />
                </a>{" "}
              </li>
              <li>
                <a href="/">
                  <InstagramIcon />
                </a>
              </li>
            </ul>
            <ContactBox>
              <TextInput placeholder="Your email" />
              <EmailIcon />
            </ContactBox>
          </div>
        </div>
      </Container>
    </FooterX>
  );
}

export default Footer;
