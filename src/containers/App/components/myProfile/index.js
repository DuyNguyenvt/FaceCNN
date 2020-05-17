import React from "react";
import styled from "styled-components";
import "./styles.scss";
import myPic from "./my-pic.jpg";
import { Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faUsers,
  faGraduationCap,
  faUniversalAccess,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import { FaSkype } from "react-icons/fa";

const SCol = styled(Col)`
  padding: 0;
`;
const SRow = styled(Row)`
  margin: 0;
`;

function MyProfile() {
  return (
    <div className="pf-page">
      <header>
        <SRow className="pf-page-header">
          <SCol xs={2} style={{ display: "flex", alignItems: "center" }}>
            <div className="pf-page-header--avatar">
              <img src={myPic} alt="test" />
            </div>
          </SCol>
          <SCol xs={10}>
            <div className="pf-page-header--content">
              <h3>Duy Quoc Ngoc Nguyen</h3>
              <h4>Front-end Developer</h4>
              <hr className="pf-page-header--separator" />
              <div>
                Currently, I am working as a front-end developer, mainly focus
                on Reactjs and React native. On the other hand, I also do well
                research on other front-end frameworks, so that I am willing to
                work with Angular as well as Vuejs if needed. Moreover, I had
                chances to get involved in doing some jobs in electrical and
                computer fields as well. Since I have bachelor's degree of
                Electronic and Telecommunication Engineering, I could possibly
                take advantage of my extensive knowledge of Electronic and
                Embedded programming for IOT system.
              </div>
            </div>
          </SCol>
        </SRow>
      </header>
      <div className="pf-page-content">
        <div className="pf-page-content--left">
          <div className="pf-sect">
            <h3 className="pf-sect--title">Contact</h3>
            <hr className="pf-sect--hr" />
            <div className="pf-icon-contact">
              <FontAwesomeIcon icon={faEnvelope} />
            </div>

            <p>nnqduy.spkt@gmail.com</p>
            <div className="pf-icon-contact">
              <FontAwesomeIcon icon={faPhone} />
            </div>
            <p>0338661531</p>
            <div className="pf-icon">
              <FaSkype />
            </div>
            <p>live:nnqduy.spkt</p>
          </div>

          <div className="pf-sect">
            <h3 className="pf-sect--title">Languages</h3>
            <hr className="pf-sect--hr" />
            <p>Vietnamese</p>
            <p>English</p>
          </div>
          <div className="pf-sect">
            <h3 className="pf-sect--title">
              Programing Languages and Frameworks
            </h3>
            <hr className="pf-sect--hr" />
            <p>Reactjs, React native, Angular</p>
            <p>Html, Css, Scss,...</p>
            <p>Nodejs, Expressjs</p>
            <p>Design Embedded system </p>
            <p> Electronic circuit design and Microcontroller Programming</p>
            <p>
              Opencv, Python, apply machine learning, deep learning algorithms
            </p>
            <p> Image Processing Programming</p>
          </div>
          <div className="pf-sect">
            <h3 className="pf-sect--title">Skills</h3>
            <hr className="pf-sect--hr" />
            <div className="pf-icon">
              <div className="pf-icon">
                <FontAwesomeIcon icon={faUsers} />
              </div>
            </div>
            <ul className="pf-sect--list">
              <li>Connection</li>
              <li>Transparency</li>
            </ul>
            <div className="pf-icon">
              <FontAwesomeIcon icon={faGraduationCap} />
            </div>
            <ul className="pf-sect--list">
              <li>Research </li>
              <li>Adapt well to new Techs</li>
            </ul>
            <div className="pf-icon">
              <FontAwesomeIcon icon={faUniversalAccess} />
            </div>
            <ul className="pf-sect--list">
              <li>Public speaking</li>
              <li>Give presentation</li>
              <li>Handle job with stress</li>
            </ul>
            <div className="pf-icon">
              <FontAwesomeIcon icon={faChartLine} />
            </div>
            <ul className="pf-sect--list">
              <li>Keep learning, improving</li>
              <li>Best practice</li>
            </ul>
          </div>

          <div className="pf-sect">
            <h3 className="pf-sect--title">My Personal Characteristics</h3>
            <hr className="pf-sect--hr" />
            <p className="pf-sect--point-box">
              Greatly respect to my colleagues
            </p>
            <p className="pf-sect--point-box">Patient, Serious.</p>
            <p className="pf-sect--point-box">Dependable at work.</p>
            <p className="pf-sect--point-box">Excited to learn new things</p>
            <p className="pf-sect--point-box">Dislike stagnation</p>
          </div>
          {/* <div className="pf-sect--reference pf-sect">
            <h3 className="pf-sect--title">References</h3>
          </div> */}
        </div>

        <div className="pf-page-content--right">
          <div className="pf-sect">
            <h2 className="pf-sect--title">Recent Projects</h2>
            <hr className="pf-sect--hr" />
            <h5 className="pf-sect--sub-title">Engage (9 months)</h5>
            <ul className="pf-sect--dot-list">
              <li>
                <span>Reference: </span>
                <a href="https://engage-test.nordiccoder.com/">
                  https://engage-test.nordiccoder.com/
                </a>
              </li>
              <li>Front-end: Reactjs</li>
              <li>Back-end: Java.</li>
            </ul>
            <h5 className="pf-sect--sub-title">Career Portal (3 months)</h5>
            <ul className="pf-sect--dot-list">
              <li>Front-end: Reactjs</li>
              <li>Back-end: Nestjs, Nodejs, MySQL.</li>
            </ul>
          </div>
          <div className="pf-sect">
            <h2 className="pf-sect--title">Education Background</h2>
            <hr className="pf-sect--hr" />
            <h5 className="pf-sect--sub-title">
              University of Technology and Education, Ho Chi Minh
            </h5>
            <div>
              Bachelor of Science in Electrical and Telecommunication
              Engineering
            </div>
            <br />
            <h5 className="pf-sect--sub-title">University of Dayton, Ohio</h5>
            <div>Master of Science in Electrical and Computer Engineering</div>
          </div>
          <div className="pf-sect">
            <h2 className="pf-sect--title">Work Experience</h2>
            <hr className="pf-sect--hr" />
            <div className="work-exp--container">
              <div className="work-exp--right">
                <div className="work-exp--content">
                  <div className="work-exp--top">
                    <div className="work-exp--tree">
                      <span>5/2019 - 4/2020</span>
                    </div>
                    <div>
                      <h5 className="work-exp-title pf-sect--sub-title">
                        Front-end Dev
                      </h5>
                      <h6>Nordic Coder</h6>
                    </div>
                  </div>
                  <ul className="work-exp--detail">
                    <li>Projects: Engage, Career Portal.</li>
                  </ul>
                </div>
                <div className="work-exp--content">
                  <div className="work-exp--top">
                    <div className="work-exp--tree">
                      <span>4/2018 - 5/2019</span>
                    </div>
                    <div>
                      <h5 className="work-exp-title pf-sect--sub-title">
                        Electrical Technician
                      </h5>
                      <h6>Electrical Department, Pure Beauty INC</h6>
                    </div>
                  </div>
                  <ul className="work-exp--detail">
                    <li>Monitor manufacturing system.</li>
                    <li>
                      Do replacing damaged parts of production systems, wiring ,
                      maintaining the electrical devices.
                    </li>
                  </ul>
                </div>
                <div className="work-exp--content">
                  <div className="work-exp--top">
                    <div className="work-exp--tree">
                      <span>4/2017 - 12/2017</span>
                    </div>
                    <div>
                      <h5 className="work-exp-title pf-sect--sub-title">
                        Research Assistant
                      </h5>
                      <h6>
                        Computer Vision Research Lab, University of Dayton
                      </h6>
                    </div>
                  </div>
                  <ul className="work-exp--detail">
                    <li>
                      Research the vehicle classification system based on
                      supervised learning model (suport vector machine) and
                      artifical neural network (multilayer perceptron).
                    </li>
                    <li>Give presentation monthly about my own research.</li>
                    <li>
                      Join to work on improving real-world project provided by
                      sponsor companies.{" "}
                    </li>
                  </ul>
                </div>
                <div className="work-exp--content">
                  <div className="work-exp--top">
                    <div className="work-exp--tree">
                      <span>6/2015 - 9/2015 </span>
                    </div>
                    <div>
                      <h5 className="work-exp-title pf-sect--sub-title">
                        Internship
                      </h5>
                      <h6>
                        Phú Mỹ Thermal Power Plant, EVN (Vietnam Electricity
                        Company)
                      </h6>
                    </div>
                  </div>
                  <ul className="work-exp--detail">
                    <li>
                      Completed studying general operation of the Thermal Power
                      Plant Phú Mỹ 1.
                    </li>
                    <li>
                      Did the research on PLC automatic system at initialization
                      stage of the steam turbine, then simulated it on simulator
                      software to test with OMROM PLC.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="pf-sect">
            <h2 className="pf-sect--title">References</h2>
            <hr className="pf-sect--hr" />
            <div className="pf-sect--title">Portfolio: </div>
            <a href="https://portfolio-app-duy-nguyen.herokuapp.com/">
              https://portfolio-app-duy-nguyen.herokuapp.com/
            </a>
            <br />
            <br />
            <div className="pf-sect--title"> Git: </div>
            <a href="https://github.com/DuyNguyenvt">
              https://github.com/DuyNguyenvt
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
